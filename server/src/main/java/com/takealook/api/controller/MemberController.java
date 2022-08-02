package com.takealook.api.controller;

import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.takealook.api.request.*;
import com.takealook.api.response.*;
import com.takealook.api.service.MemberService;
import com.takealook.common.auth.JwtAuthenticationFilter;
import com.takealook.common.auth.MemberDetails;
import com.takealook.common.model.response.BaseResponseBody;
import com.takealook.common.util.JwtAuthenticationUtil;
import com.takealook.common.util.JwtTokenUtil;
import com.takealook.db.entity.Member;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.servlet.http.HttpServletRequest;
import java.util.concurrent.ThreadLocalRandom;


@Api(value = "멤버 API", tags = {"Member"})
@RestController
@RequestMapping("/api/member")
public class MemberController {

    @Autowired
    MemberService memberService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    JwtAuthenticationUtil jwtAuthenticationUtil;

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
        if (member != null && passwordEncoder.matches(pwd, member.getPwd())) {
            return ResponseEntity.ok(MemberLoginPostRes.of(200, "success", JwtTokenUtil.getToken(memberId)));
        }
        // 유효하지 않는 패스워드인 경우, 로그인 실패
        return ResponseEntity.status(409).body(MemberLoginPostRes.of(409, "Invalid Password", null));
    }


    // 내 정보 조회
    @GetMapping("my")
    public ResponseEntity<?> getMember(HttpServletRequest request) {
        String memberId = jwtAuthenticationUtil.GetMemberIdByJwt(request);
        if (memberId != null) {
            // jwt 토큰에 포함된 계정 정보(memberId) 통해 실제 디비에 해당 정보의 계정이 있는지 조회.
            Member member = memberService.getMemberByMemberId(memberId);
            if (member != null) {
                return ResponseEntity.status(200).body(MemberInfoRes.of(member));
            }
        }
        return ResponseEntity.status(409).body("fail");
    }


    // 회원 정보 조회
    @GetMapping("{seq}")
    public ResponseEntity<MemberViewRes> getMyInfo(@PathVariable("seq") Long seq) {
        Member member = memberService.getMemberByMemberSeq(seq);
        return ResponseEntity.status(200).body(MemberViewRes.of(member));
    }

    // 회원 정보 수정
    @PatchMapping
    public ResponseEntity<?> updateMyInfo(@RequestBody MemberUpdatePostReq memberUpdatePostReq, HttpServletRequest request) {
        String memberId = jwtAuthenticationUtil.GetMemberIdByJwt(request);
        if (memberId != null) {
            // jwt 토큰에 포함된 계정 정보(memberId) 통해 실제 디비에 해당 정보의 계정이 있는지 조회.
            Member member = memberService.getMemberByMemberId(memberId);
            if (member != null) {
                memberService.updateMember(member.getSeq(), memberUpdatePostReq);
                return ResponseEntity.status(200).body("success");
            }
        }
        return ResponseEntity.status(409).body("fail");
    }

    // 비밀번호 변경
    @PatchMapping("/password")
    public ResponseEntity<?> changePassword(@RequestBody String pwd, HttpServletRequest request) {
        String memberId = jwtAuthenticationUtil.GetMemberIdByJwt(request);
        if (memberId != null) {
            // jwt 토큰에 포함된 계정 정보(memberId) 통해 실제 디비에 해당 정보의 계정이 있는지 조회.
            Member member = memberService.getMemberByMemberId(memberId);
            if (member != null) {
                memberService.updateMemberPassword(member.getSeq(), pwd);
                return ResponseEntity.status(200).body("success");
            }
        }
        return ResponseEntity.status(409).body("fail");
    }


    /////////////////// 비밀번호 재설정 (비밀번호 찾기) start ////////////////////////
    // 1. 이메일 체크
    @GetMapping("/password/{email}")
    public ResponseEntity<?> checkEmail(@PathVariable("email") String email) {
        Member member = memberService.getMemberByEmail(email);
        if (member == null) return ResponseEntity.status(409).body("fail");
        return ResponseEntity.status(200).body("success");
    }

    // 2. 인증번호 확인
    // 미완성
    @PostMapping("/password")
    public ResponseEntity<?> sendEmail(@RequestBody String email) {
        int randNum = ThreadLocalRandom.current().nextInt(100000, 1000000);
        int result = memberService.sendEmail(randNum, email);
        if (result == 0) return ResponseEntity.status(409).body(BaseResponseBody.of(409, "fail"));
        return ResponseEntity.status(200).body(MemberRandomNumberRes.of(200, "success", randNum));
    }

    // 3. 비밀번호 재설정
    @PatchMapping("password/change")
    public ResponseEntity<?> setNewPassword(@RequestBody String email, String pwd) {
        memberService.setNewPassword(email, pwd);
        return ResponseEntity.status(200).body("success");
    }
    /////////////////// 비밀번호 재설정 (비밀번호 찾기) end ////////////////////////

    // 회원 탈퇴
    @DeleteMapping
    public ResponseEntity<?> deleteMember(HttpServletRequest request) {
        String memberId = jwtAuthenticationUtil.GetMemberIdByJwt(request);
        if (memberId != null) {
            // jwt 토큰에 포함된 계정 정보(memberId) 통해 실제 디비에 해당 정보의 계정이 있는지 조회.
            Member member = memberService.getMemberByMemberId(memberId);
            if (member != null) {
                memberService.deleteMember(member.getSeq());
                return ResponseEntity.status(200).body("success");
            }
        }
        return ResponseEntity.status(200).body("success");
    }


    // 아이디 중복 검사
    @GetMapping("/id/{memberId}")
    public ResponseEntity<BaseResponseBody> memberIdDuplicateCheck(@PathVariable("memberId") String memberId) {
        Member member = memberService.getMemberByMemberId(memberId);
        // 검색 결과가 없으면 (중복된 아이디가 없다면) success
        if (member == null) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
        }
        return ResponseEntity.status(409).body(BaseResponseBody.of(409, "fail"));
    }

    // 닉네임 중복 검사
    @GetMapping("/nickname/{nickname}")
    public ResponseEntity<BaseResponseBody> nicknameDuplicateCheck(@PathVariable("nickname") String nickname) {
        Member member = memberService.getMemberByNickname(nickname);
        // 검색 결과가 없으면 (중복된 닉네임이 없다면) success
        if (member == null) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
        }
        return ResponseEntity.status(409).body(BaseResponseBody.of(409, "fail"));
    }

    // 아이디 중복 검사
    @GetMapping("/email/{email}")
    public ResponseEntity<BaseResponseBody> emailDuplicateCheck(@PathVariable("email") String email) {
        Member member = memberService.getMemberByEmail(email);
        // 검색 결과가 없으면 (중복된 이메일이 없다면) success
        if (member == null) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
        }
        return ResponseEntity.status(409).body(BaseResponseBody.of(409, "fail"));
    }

    // 아이디 찾기
    @PostMapping("/id")
    public ResponseEntity<?> findMemberId(@RequestBody MemberFindMemberIdReq memberFindMemberIdReq) {
        String memberId = memberService.FindMemberId(memberFindMemberIdReq);
        if (memberId == null) {
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "fail"));
        }
        return ResponseEntity.status(200).body(MemberFindMemberIdRes.of(200, "success", memberId));
    }

    // 신뢰도 수정
    @PatchMapping("/score")
    public ResponseEntity<BaseResponseBody> updateScore(@RequestBody MemberScoreUpdatePatchReq memberScoreUpdatePatchReq) {
        Member member = memberService.getMemberByMemberSeq(memberScoreUpdatePatchReq.getSeq());
        if (member == null) return ResponseEntity.status(409).body(BaseResponseBody.of(409, "fail"));
        memberService.updateMemberScore(memberScoreUpdatePatchReq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }
}
