package com.takealook.api.service;

import com.takealook.api.request.*;
import com.takealook.db.entity.Member;

public interface MemberService {

    // 회원 가입
    Member createMember(MemberRegisterPostReq memberRegisterPostReq);

    // 회원 정보 보기
    Member getMemberByMemberSeq(Long seq);

    // 회원 정보 수정
    void updateMember(Long seq, MemberUpdatePostReq memberUpdatePostReq);

    // 비밀번호 변경
    void updateMemberPassword(Long seq, String pwd);

    // 이메일 체크
    Member getMemberByEmail(String email);

    // 이메일 송신
    int sendEmail(int randNum, String email);

    void setNewPassword(String email, String pwd);

    // 회원 삭제
    void deleteMember(Long memberSeq);

    // 아이디로 회원 찾기
    Member getMemberByMemberId(String memberId);

    // 닉네임으로 회원 찾기
    Member getMemberByNickname(String nickname);

    // 아이디 찾기
    String FindMemberId(MemberFindMemberIdReq memberFindMemberIdReq);

    // 신뢰도 수정
    void updateMemberScore(MemberScoreUpdatePatchReq memberScoreUpdatePatchReq);
}
