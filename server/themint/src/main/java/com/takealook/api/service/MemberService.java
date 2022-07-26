package com.takealook.api.service;

import com.takealook.api.request.MemberDeleteReq;
import com.takealook.api.request.MemberRegisterPostReq;
import com.takealook.api.request.MemberUpdatePostReq;
import com.takealook.db.entity.Member;

public interface MemberService {

    // 회원 가입
    Member createMember(MemberRegisterPostReq memberRegisterPostReq);

    // 회원 정보 보기
    Member getMemberByMemberSeq(Long seq);

    // 내 정보 조회

    // 회원 정보 수정
    void updateMember(MemberUpdatePostReq memberUpdatePostReq);

    // 회원 삭제
    void deleteMember(MemberDeleteReq memberDeleteReq);

    // 아이디로 회원 찾기
    Member getMemberByMemberId(String memberId);
}
