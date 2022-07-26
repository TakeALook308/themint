package com.takealook.api.service;

import com.takealook.api.request.*;
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

    // 닉네임으로 회원 찾기
    Member getMemberByNickname(String nickname);

    // 이메일로 회원 찾기
    Member getMemberByEmail(String email);

    // 아이디 찾기
    String FindMemberId(MemberFindMemberIdReq memberFindMemberIdReq);

    // 신뢰도 수정

    void updateMemberScore(MemberScoreUpdatePatchReq memberScoreUpdatePatchReq);
}
