package com.takealook.api.controller;

import com.takealook.api.request.*;
import com.takealook.api.response.MemberFindMemberIdRes;
import com.takealook.api.response.MemberLoginPostRes;
import com.takealook.api.response.MemberViewRes;
import com.takealook.api.service.MemberService;
import com.takealook.common.auth.JwtAuthenticationFilter;
import com.takealook.common.model.response.BaseResponseBody;
import com.takealook.common.util.JwtTokenUtil;
import com.takealook.db.entity.Member;
import com.takealook.db.repository.MemberRepositorySupport;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@Api(value = "멤버 API", tags = {"Member"})
@RestController
@RequestMapping("/api/member")
public class MemberController {

    @Autowired
    MemberService memberService;

    @Autowired
    PasswordEncoder passwordEncoder;

    // 회원 가입
    @PostMapping
    public ResponseEntity<BaseResponseBody> registerMember(@RequestBody MemberRegisterPostReq memberRegisterPostReq) {
        Member member = memberService.createMember(memberRegisterPostReq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }

    // 로그인
    @PostMapping("/login")
    public ResponseEntity<MemberLoginPostRes> login(@RequestBody MemberLoginPostReq memberLoginPostReq) {
        String memberId = memberLoginPostReq.getMemberId();
        String pwd = memberLoginPostReq.getPwd();

        Member member = memberService.getMemberByMemberId(memberId);
        // 로그인 요청한 유저의 패스워드와 같은 경우 (유효한 패스워드인지 확인)
        if (passwordEncoder.matches(pwd, member.getPwd())) {
            return ResponseEntity.ok(MemberLoginPostRes.of(200, "success", JwtTokenUtil.getToken(memberId)));
        }
        // 유효하지 않는 패스워드인 경우, 로그인 실패
        return ResponseEntity.status(401).body(MemberLoginPostRes.of(401, "Invalid Password", null));
    }

    // 내 정보 조회
    // JWT 토큰 필요 (미완성)
//    @GetMapping("my")
//    public ResponseEntity<?> getMember() {
//        Member member = memberService.getMemberByMemberSeq();
//        return ResponseEntity.status(200).body(MemberViewRes.of(member));
//    }

    // 회원 정보 조회
    @GetMapping("{seq}")
    public ResponseEntity<MemberViewRes> getMyInfo(@PathVariable("seq") Long seq) {
        Member member = memberService.getMemberByMemberSeq(seq);
        return ResponseEntity.status(200).body(MemberViewRes.of(member));
    }

    // 회원 정보 수정
    // JWT 토큰 필요 (미완성)
    public ResponseEntity<?> updateMyInfo(@RequestBody MemberUpdatePostReq memberUpdatePostReq) {
        return ResponseEntity.status(200).body("Success");
    }

    // 회원 탈퇴
    // JWT 토큰 필요 (미완성)
    public ResponseEntity<?> deleteMember(@RequestBody MemberDeleteReq memberDeleteReq) {
        memberService.deleteMember(memberDeleteReq);
        return ResponseEntity.status(200).body("Success");
    }


    // 아이디 중복 검사
    @GetMapping("/id/{memberId}")
    public ResponseEntity<BaseResponseBody> memberIdDuplicateCheck(@PathVariable("memberId") String memberId) {
        Member member = memberService.getMemberByMemberId(memberId);
        // 검색 결과가 없으면 (중복된 아이디가 없다면) success
        if (member == null) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
        }
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "fail"));
    }

    // 닉네임 중복 검사
    @GetMapping("/nickname/{nickname}")
    public ResponseEntity<BaseResponseBody> nicknameDuplicateCheck(@PathVariable("nickname") String nickname) {
        Member member = memberService.getMemberByNickname(nickname);
        // 검색 결과가 없으면 (중복된 닉네임이 없다면) success
        if (member == null) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
        }
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "fail"));
    }

    // 아이디 중복 검사
    @GetMapping("/email/{email}")
    public ResponseEntity<BaseResponseBody> emailDuplicateCheck(@PathVariable("email") String email) {
        Member member = memberService.getMemberByEmail(email);
        // 검색 결과가 없으면 (중복된 이메일이 없다면) success
        if (member == null) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
        }
        return ResponseEntity.status(401).body(BaseResponseBody.of(401, "fail"));
    }

    // 아이디 찾기
    @PostMapping("/id")
    public ResponseEntity<MemberFindMemberIdRes> findMemberId(@RequestBody MemberFindMemberIdReq memberFindMemberIdReq) {
        String memberId = memberService.FindMemberId(memberFindMemberIdReq);
        if (memberId == null) {
            return ResponseEntity.status(200).body(MemberFindMemberIdRes.of(401, "fail", null));
        }
        return ResponseEntity.status(200).body(MemberFindMemberIdRes.of(200, "success", memberId));
    }

    // 신뢰도 수정
    @PatchMapping("/score")
    public ResponseEntity<BaseResponseBody> updateScore(@RequestBody MemberScoreUpdatePatchReq memberScoreUpdatePatchReq) {
        memberService.updateMemberScore(memberScoreUpdatePatchReq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }
}
