package com.takealook.api.service;

import com.takealook.api.request.*;
import com.takealook.db.entity.Member;
import com.takealook.db.repository.MemberRepository;
import com.takealook.db.repository.MemberRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;
import java.util.concurrent.ThreadLocalRandom;

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
    public void updateMember(Long seq, MemberUpdatePostReq memberUpdatePostReq) {
        memberRepositorySupport.updateMemberInfo(seq, memberUpdatePostReq);
    }
    @Override
    public void updateMemberPassword(Long seq, String pwd) {
        memberRepositorySupport.updateMemberPassword(seq, passwordEncoder.encode(pwd));
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
    public void sendEmail(String email) {
        int randNum = ThreadLocalRandom.current().nextInt(100000, 1000000); // 랜덤 숫자 6자리
//        SimpleMailMessage msg = new SimpleMailMessage();
//        msg.setTo(email);
//        msg.setFrom(MAIL_ADDRESS);
//        msg.setSubject("더 민트 비밀번호 재설정 인증번호");
//        msg.setText("인증번호는 " + randNum + "입니다.");
//        sender.send(msg);
        String host = "smtp.naver.com";
        String user = "etminho12@naver.com";
        String password = "uk19681311@@";

        // SMTP 서버 정보를 설정한다.
        Properties props = new Properties();
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", 587);
        props.put("mail.smtp.auth", "true");

        Session session = Session.getDefaultInstance(props, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(user, password);
            }
        });

        try {
            MimeMessage message = new MimeMessage(session);
            message.setFrom(new InternetAddress(user));
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(email));

            // 메일 제목
            message.setSubject("더민트 인증번호 전송");

            // 메일 내용
            String body = "인증번호는 " + randNum + "입니다!";
            message.setText(body);

            // send the message
            Transport.send(message);
            System.out.println("Success Message Send");

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void setNewPassword(String email, String pwd) {
        Member member = memberRepository.findByEmail(email);
        if (member != null) {
            Long seq = member.getSeq();
            memberRepositorySupport.updateMemberPassword(seq, passwordEncoder.encode(pwd));
        }
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
