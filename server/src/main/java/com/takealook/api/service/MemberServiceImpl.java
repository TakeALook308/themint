package com.takealook.api.service;

import com.takealook.api.request.*;
import com.takealook.db.entity.Member;
import com.takealook.db.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * 멤버 관련 비즈니스 로직 처리를 위한 서비스 구현
 */
@Service
public class MemberServiceImpl implements MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private MailSender sender;

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
        return memberRepository.findBySeq(seq);

    }

    @Override
    public void updateMember(Long memberSeq, MemberUpdatePostReq memberUpdatePostReq) {
        Member member = memberRepository.findBySeq(memberSeq);
        member.setNickname(memberUpdatePostReq.getNickname());
        member.setEmail(memberUpdatePostReq.getEmail());
        member.setAddress(memberUpdatePostReq.getAddress());
        member.setPhone(memberUpdatePostReq.getPhone());
        member.setProfileUrl(memberUpdatePostReq.getProfileUrl());
        member.setBankCode(memberUpdatePostReq.getBankCode());
        member.setAccountNo(memberUpdatePostReq.getAccountNo());
        member.setNoticeKakao(memberUpdatePostReq.getNoticeKakao());
        member.setNoticeEmail(memberUpdatePostReq.getNoticeEmail());
        memberRepository.save(member);
    }

    @Override
    public void updateMemberPassword(Long seq, String pwd) {
        memberRepository.updateMemberPassword(seq, passwordEncoder.encode(pwd));
    }


    @Override
    public void deleteMember(Long memberSeq) {
        // 토큰으로 회원 정보 확인 후, pwd 같은지 확인
        memberRepository.deleteMemberBySeq(memberSeq);
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
    public int sendEmail(int randNum, String email) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setFrom("etminho12@naver.com");
            message.setSubject("[더민트] 비밀번호 찾기 - 임시 비밀번호 안내드립니다.");
            message.setText("임시 비밀번호 : " + randNum);
            sender.send(message);
            return 1;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public void setNewPassword(String email, String pwd) {
        Member member = memberRepository.findByEmail(email);
        if (member != null) {
            Long seq = member.getSeq();
            memberRepository.updateMemberPassword(seq, passwordEncoder.encode(pwd));
        }
    }

    @Override
    public String FindMemberId(MemberFindMemberIdReq memberFindMemberIdReq) {
        String memberName = memberFindMemberIdReq.getMemberName();
        String phone = memberFindMemberIdReq.getPhone();
        Member member = memberRepository.findByMemberNameAndPhone(memberName, phone);
        if (member == null) return null;
        return member.getMemberId();
    }

    @Override
    public void updateMemberScore(MemberScoreUpdatePatchReq memberScoreUpdatePatchReq) {
        Long seq = memberScoreUpdatePatchReq.getSeq();
        int score = memberScoreUpdatePatchReq.getScore();
        memberRepository.updateMemberScore(seq, score);
    }
}
