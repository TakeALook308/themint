package com.takealook.api.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.takealook.api.request.*;
import com.takealook.api.response.*;
import com.takealook.api.service.MemberService;
import com.takealook.api.service.S3FileService;
import com.takealook.api.service.SmsService;
import com.takealook.common.auth.MemberDetails;
import com.takealook.common.exception.code.ErrorCode;
import com.takealook.common.exception.member.MemberNotFoundException;
import com.takealook.common.util.JwtTokenUtil;
import com.takealook.db.entity.Member;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ThreadLocalRandom;


@Api(value = "멤버 API", tags = {"Member"})
@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    MemberService memberService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    SmsService smsService;

    @Autowired
    S3FileService s3FileService;

    // 회원 가입
    @PostMapping
    public ResponseEntity<?> registerMember(@RequestBody MemberRegisterPostReq memberRegisterPostReq) {
        Member member = memberService.createMember(memberRegisterPostReq);
        // 회원가입 성공 시 자동 로그인
        if (member != null) {
            return ResponseEntity.status(200).body(MemberLoginPostRes.of(JwtTokenUtil.getToken(member.getMemberId()), member.getSeq(), member.getMemberId(), member.getNickname()));
        }
        return ResponseEntity.status(409).body("signup fail");
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberLoginPostReq memberLoginPostReq) {
        String memberId = memberLoginPostReq.getMemberId();
        String pwd = memberLoginPostReq.getPwd();
        Member member = memberService.getMemberByMemberId(memberId);
        // 로그인 요청한 유저의 패스워드와 같은 경우 (유효한 패스워드인지 확인)
        if (member != null && passwordEncoder.matches(pwd, member.getPwd())) {
            return ResponseEntity.status(200).body(MemberLoginPostRes.of(JwtTokenUtil.getToken(memberId), member.getSeq(), member.getMemberId(), member.getNickname()));
        }
        // 유효하지 않는 패스워드인 경우, 로그인 실패
        return ResponseEntity.status(409).body("fail");
    }

//    @GetMapping("/klogin")
//    public ResponseEntity<?> klogin(@RequestParam String authorize_code) throws Exception{
//        System.out.println(authorize_code);
//        String access_token = memberService.getAccessTokenKakao(authorize_code);
//        System.out.println(access_token);
//        Member member = memberService.getMemberKakao(access_token);
//        Member findMember = memberService.getMemberByEmail(member.getEmail());
//
//        return ResponseEntity.status(200).body(MemberLoginPostRes.of(JwtTokenUtil.getToken(findMember.getMemberId()), member.getSeq(), member.getMemberId(), member.getNickname()));
//    }

    // 회원 목록 검색
    @GetMapping
    public ResponseEntity<MemberListRes> getMemberList(@RequestParam(value = "word", required = false) String word, @RequestParam("page") int page, @RequestParam("size") int size) {
        List<MemberListEntityRes> memberListEntityResList = new ArrayList<>();
        Boolean hasMore = false;
        Pageable pageable = PageRequest.of(page, size, Sort.by("score").descending());
        List<Member> memberList = memberService.getMemberListByWord(word, pageable);
        List<Member> hasMoreList = memberService.getMemberListByWord(word, PageRequest.of(page + 1, size, Sort.by("score").descending()));
        if (hasMoreList.size() != 0) hasMore = true;
        for (Member member : memberList) {
            memberListEntityResList.add(MemberListEntityRes.of(member));
        }
        return ResponseEntity.status(200).body(MemberListRes.of(memberListEntityResList, hasMore));
    }

    // 내 정보 조회
//    @GetMapping("/my")
//    public ResponseEntity<?> getMyInfo(@ApiIgnore Authentication authentication) {
//        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
//        Long memberSeq = memberDetails.getMemberSeq();
//        Member member = memberService.getMemberByMemberSeq(memberSeq);
//        if (member != null) {
//            return ResponseEntity.status(200).body(MemberInfoRes.of(member));
//        }
//        return ResponseEntity.status(409).body("fail");
//    }

    // 회원 정보 조회
    @GetMapping("/{seq}")
    public ResponseEntity<MemberInfoRes> getMemberInfo(@PathVariable("seq") Long seq) {
        Member member = memberService.getMemberByMemberSeq(seq);
        return ResponseEntity.status(200).body(MemberInfoRes.of(member));
    }

    // 회원 정보 수정
    @PatchMapping
    public ResponseEntity<?> updateMyInfo(@RequestBody MemberUpdatePostReq memberUpdatePostReq, @ApiIgnore Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        Member member = memberService.getMemberByMemberSeq(memberSeq);
        if (member != null) {
            if((member.getAccountNo() == null || member.getAccountNo().length() == 0) && memberUpdatePostReq.getAccountNo().length() != 0 ){ // 계좌번호 원래 없었는데 입력하면 신뢰도 +3
                memberService.updateMemberScore(memberSeq, 3);
            }
            memberService.updateMember(memberSeq, memberUpdatePostReq);
            return ResponseEntity.status(200).body("success");
        } else {
            throw new MemberNotFoundException("member not found", ErrorCode.MEMBER_NOT_FOUND);
        }
    }

    // 프로필 사진 변경
    @PostMapping("img")
    public ResponseEntity<?> updateProfileImage(@RequestPart MultipartFile multipartFile, @ApiIgnore Authentication authentication) throws Exception {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        Member member = memberService.getMemberByMemberSeq(memberSeq);
        if (member != null) {
            String result = s3FileService.uploadProfileImage(multipartFile, memberSeq);
            if (result == "fail") ResponseEntity.status(409).body("fail");
            return ResponseEntity.status(200).body(result);
        }
        return ResponseEntity.status(409).body("fail");
    }

    // 비밀번호 변경
    @PatchMapping("/password")
    public ResponseEntity<?> changePassword(@RequestBody Map<String, String> pwdMap, @ApiIgnore Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        Member member = memberService.getMemberByMemberSeq(memberSeq);
        if (member != null) {
            memberService.updateMemberPassword(member.getSeq(), pwdMap.get("pwd"));
            return ResponseEntity.status(200).body("success");
        }
        return ResponseEntity.status(409).body("fail");
    }

    /////////////////// 비밀번호 재설정 (비밀번호 찾기) start ////////////////////////
    // 1. 아이디, 이메일 체크 + 인증번호 전송
    @PostMapping("/password/check")
    public ResponseEntity<?> checkEmail(@RequestBody MemberSetNewPwdCheckPostReq memberSetNewPwdCheckPostReq) {
        // 아이디-이메일 체크
        Member member = memberService.getMemberByMemberIdAndEmail(memberSetNewPwdCheckPostReq);
        // 메일로 인증번호 전송
        int randNum = ThreadLocalRandom.current().nextInt(100000, 1000000);
        int result = memberService.sendEmail(randNum, member.getEmail());
        // 메일 전송 실패 시
        if (result == 0) return ResponseEntity.status(409).body("fail");
        return ResponseEntity.status(200).body(MemberRandomNumberRes.of(randNum));
    }

//    // 2. 인증번호 확인
//    @PostMapping("/password")
//    public ResponseEntity<?> sendEmail(@RequestBody Map<String, String> emailMap) {
//        int randNum = ThreadLocalRandom.current().nextInt(100000, 1000000);
//        int result = memberService.sendEmail(randNum, emailMap.get("email"));
//        // 메일 전송 실패 시
//        if (result == 0) return ResponseEntity.status(409).body("fail");
//        return ResponseEntity.status(200).body(MemberRandomNumberRes.of(randNum));
//    }

    // 3. 비밀번호 재설정
    @PatchMapping("password/change")
    public ResponseEntity<?> setNewPassword(@RequestBody MemberSetNewPwdPatchReq memberSetNewPwdPatchReq) {
        memberService.setNewPassword(memberSetNewPwdPatchReq);
        return ResponseEntity.status(200).body("success");
    }

    /////////////////// 비밀번호 재설정 (비밀번호 찾기) end ////////////////////////

    // 회원 탈퇴
    @DeleteMapping
    public ResponseEntity<?> deleteMember(@ApiIgnore Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        Member member = memberService.getMemberByMemberSeq(memberSeq);
        if (member != null) {
            memberService.deleteMember(member.getSeq());
            return ResponseEntity.status(200).body("success");
        }
        return ResponseEntity.status(409).body("fail");
    }


    // 아이디 중복 검사
    @GetMapping("/id/{memberId}")
    public ResponseEntity<?> memberIdDuplicateCheck(@PathVariable("memberId") String memberId) {
        Member member = memberService.getMemberByMemberId(memberId);
        // 검색 결과가 없으면 (중복된 아이디가 없다면) success
        if (member == null) {
            return ResponseEntity.status(200).body("success");
        }
        return ResponseEntity.status(409).body("fail");
    }

    // 닉네임 중복 검사
    @GetMapping("/nickname/{nickname}")
    public ResponseEntity<?> nicknameDuplicateCheck(@PathVariable("nickname") String nickname) {
        Member member = memberService.getMemberByNickname(nickname);
        // 검색 결과가 없으면 (중복된 닉네임이 없다면) success
        if (member == null) {
            return ResponseEntity.status(200).body("success");
        }
        return ResponseEntity.status(409).body("fail");
    }

    // 아이디 중복 검사
    @GetMapping("/email/{email}")
    public ResponseEntity<?> emailDuplicateCheck(@PathVariable("email") String email) {
        Member member = memberService.getMemberByEmail(email);
        // 검색 결과가 없으면 (중복된 이메일이 없다면) success
        if (member == null) {
            return ResponseEntity.status(200).body("success");
        }
        return ResponseEntity.status(409).body("fail");
    }

    // 휴대폰 번호 중복 검사
    @GetMapping("/phone/{phone}")
    public ResponseEntity<?> phoneDuplicateCheck(@PathVariable("phone") String phone) {
        Member member = memberService.getMemberByPhone(phone);
        if (member == null) {
            return ResponseEntity.status(200).body("success");
        }
        return ResponseEntity.status(409).body("fail");
    }

    // 아이디 찾기
    @PostMapping("/id")
    public ResponseEntity<?> findMemberId(@RequestBody MemberFindMemberIdReq memberFindMemberIdReq) {
        String memberId = memberService.findMemberId(memberFindMemberIdReq);
        return ResponseEntity.status(200).body(MemberFindMemberIdRes.of(memberId));
    }

    // 신뢰도 수정
    //1. 리뷰 달렸을 때 score 기준으로
    // - 1, 2 점이면 다운, 3이면 유지, 4,5점이면 업
    //2. 경매 게시글 하나 올리면 1점 업
    //3. 경매 예약 시간 지났는데 status 0이면 -3점?
    //4. 계좌번호 등 개인 정보 더 추가했을 때 3점씩 업
    //5. 낙찰됐는데 일주일 내에 입금 안하면 -5점?
    @PatchMapping("/score")
    public ResponseEntity<?> updateScore(@RequestBody MemberScoreUpdatePatchReq memberScoreUpdatePatchReq) {
        Member member = memberService.getMemberByMemberSeq(memberScoreUpdatePatchReq.getSeq());
        if (member == null) throw new MemberNotFoundException("member not found", ErrorCode.MEMBER_NOT_FOUND);
        memberService.updateMemberScore(memberScoreUpdatePatchReq.getSeq(), memberScoreUpdatePatchReq.getScore());
        return ResponseEntity.status(200).body("success");
    }

    // 문자 인증
    @PostMapping("/sms")
    public ResponseEntity<?> smsAuth(@RequestBody Map<String, String> phoneMap) throws UnsupportedEncodingException, NoSuchAlgorithmException, URISyntaxException, InvalidKeyException, JsonProcessingException {
        int randNum = ThreadLocalRandom.current().nextInt(100000, 1000000);

        SendSmsRes sendSmsRes = smsService.sendSms(phoneMap.get("phone"), String.valueOf(randNum));
        if (sendSmsRes.getStatusName().equals("fail"))
            return ResponseEntity.status(409).body("fail");
        return ResponseEntity.status(200).body(randNum);
    }

    // 로그인 멤버 기본 정보 받기
    @GetMapping("/info")
    public ResponseEntity<?> getLoginMemberInfo(@ApiIgnore Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        Member member = memberService.getMemberByMemberSeq(memberSeq);
        if (member != null) {
            return ResponseEntity.status(200).body(MemberLoginMemberInfoRes.of(member.getSeq(), member.getMemberId(), member.getNickname()));
        }
        return ResponseEntity.status(409).body("fail");
    }
}
