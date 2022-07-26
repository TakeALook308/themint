package com.takealook.api.controller;

import com.takealook.api.request.MemberDeleteReq;
import com.takealook.api.request.MemberRegisterPostReq;
import com.takealook.api.request.MemberUpdatePostReq;
import com.takealook.api.response.MemberInfoRes;
import com.takealook.api.response.MemberViewRes;
import com.takealook.api.service.MemberService;
import com.takealook.db.entity.Member;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "멤버 API", tags = {"Member"})
@RestController
@RequestMapping("/api/member")
public class MemberController {

    @Autowired
    MemberService memberService;

    // 회원 가입
    @PostMapping
    public ResponseEntity<?> registerMember(@RequestParam MemberRegisterPostReq memberRegisterPostReq) {
        memberService.createMember(memberRegisterPostReq);
        return ResponseEntity.status(200).body("Success");
    }

    // 회원 정보 조회
    @GetMapping
    public ResponseEntity<?> getMember(@PathVariable Long seq) {
        Member member = memberService.getMemberByMemberSeq(seq);
        return ResponseEntity.status(200).body(MemberViewRes.of(member));
    }

    // 내 정보 조회
    @GetMapping("/my")
    public ResponseEntity<?> getMyInfo(@PathVariable Long seq) {
        Member member = memberService.getMemberByMemberSeq(seq);
        return ResponseEntity.status(200).body(MemberInfoRes.of(member));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMyInfo() {
        Member member = memberService.getMemberByMemberId("mino");
        return ResponseEntity.status(200).body(member);
    }

    // 회원 정보 수정
    public ResponseEntity<?> updateMyInfo(@RequestParam MemberUpdatePostReq memberUpdatePostReq) {
        return ResponseEntity.status(200).body("Success");
    }
    // 회원 탈퇴
    public ResponseEntity<?> deleteMember(@RequestParam MemberDeleteReq memberDeleteReq) {
        memberService.deleteMember(memberDeleteReq);
        return ResponseEntity.status(200).body("Success");
    }



}
