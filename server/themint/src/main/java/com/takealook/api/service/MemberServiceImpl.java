package com.takealook.api.service;

import com.takealook.api.request.*;
import com.takealook.db.entity.Member;
import com.takealook.db.repository.MemberRepository;
import com.takealook.db.repository.MemberRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * 멤버 관련 비즈니스 로직 처리를 위한 서비스 구현
 */
@Service
public class MemberServiceImpl implements MemberService {
    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MemberRepositorySupport memberRepositorySupport;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public Member createMember(MemberRegisterPostReq memberRegisterPostReq) {
        Member member = Member.builder()
                .memberId(memberRegisterPostReq.getMemberId())
                .pwd(passwordEncoder.encode(memberRegisterPostReq.getPwd()))
                .memberName(memberRegisterPostReq.getMemberId())
                .nickname(memberRegisterPostReq.getNickname())
                .email(memberRegisterPostReq.getEmail())
                .address(memberRegisterPostReq.getAddress())
                .phone(memberRegisterPostReq.getPhone())
                .noticeKakao(memberRegisterPostReq.getNoticeKakao())
                .noticeEmail(memberRegisterPostReq.getNoticeEmail())
                .build();
        return memberRepository.save(member);
    }

    @Override
    public Member getMemberByMemberSeq(Long seq) {
        return memberRepository.findBySeq(seq).get();
    }

    @Override
    public void updateMember(MemberUpdatePostReq memberUpdatePostReq) {

    }

    @Override
    public void deleteMember(MemberDeleteReq memberDeleteReq) {
        // 토큰으로 회원 정보 확인 후, pwd 같은지 확인
        memberRepository.deleteByMemberId(memberDeleteReq.getMemberId());
    }

    @Override
    public Member getMemberByMemberId(String memberId) {
        return memberRepository.findByMemberId(memberId);
    }

    @Override
    public Member getMemberByNickname(String nickname) {
        return memberRepository.findByNickname(nickname);
    }

    @Override
    public Member getMemberByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    @Override
    public String FindMemberId(MemberFindMemberIdReq memberFindMemberIdReq) {
        String memberName = memberFindMemberIdReq.getMemberName();
        String phone = memberFindMemberIdReq.getPhone();
        Member member = memberRepository.findByMemberNameAndPhone(memberName, phone);
        return member.getMemberId();
    }

    @Override
    public void updateMemberScore(MemberScoreUpdatePatchReq memberScoreUpdatePatchReq) {
        Long seq = memberScoreUpdatePatchReq.getSeq();
        int score = memberScoreUpdatePatchReq.getScore();
//        memberRepository.updateMemberScore(seq, score);
        memberRepositorySupport.updateMemberScore(seq, score);
    }
}
