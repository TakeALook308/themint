package com.takealook.api.service;

import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.takealook.api.request.*;
import com.takealook.db.entity.Member;
import com.takealook.db.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.List;
import java.util.Random;

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
        int randomIdx = new Random().nextInt(6);
        String profileUrl = "/member/basic" + randomIdx + ".png";
        Member member = Member.builder()
                .memberId(memberRegisterPostReq.getMemberId())
                .pwd(passwordEncoder.encode(memberRegisterPostReq.getPwd()))
                .memberName(memberRegisterPostReq.getMemberName())
                .nickname(memberRegisterPostReq.getNickname())
                .email(memberRegisterPostReq.getEmail())
                .address(memberRegisterPostReq.getAddress())
                .addressDetail(memberRegisterPostReq.getAddressDetail())
                .phone(memberRegisterPostReq.getPhone())
                .noticeKakao(memberRegisterPostReq.getNoticeKakao())
                .noticeEmail(memberRegisterPostReq.getNoticeEmail())
                .profileUrl(profileUrl) // 기본이미지
                .build();
        return memberRepository.save(member);
    }

    @Override
    public String getAccessTokenKakao(String authorize_code) throws Exception {
        String access_token = "";
        String reqURL = "https://kauth.kakao.com/oauth/token";

        try {
            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();

            conn.setRequestMethod("POST");
            conn.setDoOutput(true);

            BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(conn.getOutputStream()));
            StringBuilder sb = new StringBuilder();
            sb.append("grant_type=authorization_code");
            sb.append("&client_id=b72159a0aae4327b4b1b463c3c529e6d");
            sb.append("&redirect_uri=https://i7a308.p.ssafy.io/kakaologin");
            sb.append("&code=" + authorize_code);
            bw.write(sb.toString());
            bw.flush();

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line = "";
            String result = "";

            while ((line = br.readLine()) != null) {
                result += line;
            }

            JsonElement element = JsonParser.parseString(result);

            access_token = element.getAsJsonObject().get("access_token").getAsString();

            br.close();
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return access_token;
    }

    @Override
    public Member getMemberKakao(String access_token) throws Exception {
        Member member = new Member();
        String reqURL = "https://kapi.kakao.com/v2/user/me";

        try {

            URL url = new URL(reqURL);
            HttpURLConnection conn = (HttpURLConnection)url.openConnection();
            conn.setRequestMethod("POST");

            conn.setRequestProperty("Authorization", "Bearer " + access_token);

            BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

            String line = "";
            String result = "";

            while((line = br.readLine())!= null) {
                result += line;
            }

            System.out.println(result);
            JsonElement element = JsonParser.parseString(result);

            JsonObject kakao_account = element.getAsJsonObject().get("kakao_account").getAsJsonObject();
            String id = element.getAsJsonObject().get("id").getAsString();
            String nickname = kakao_account.getAsJsonObject().get("profile_nickname").getAsString();
            String profile_image = kakao_account.getAsJsonObject().get("profile_image").getAsString();
            String email = kakao_account.getAsJsonObject().get("email").getAsString();
            System.out.println(id + " " + nickname + " " + profile_image + " " + email);
            member.setMemberId(id);
            member.setNickname(nickname);
            member.setProfileUrl(profile_image);
            member.setEmail(email);

            br.close();
        } catch(IOException e) {
            e.printStackTrace();
        }
        return member;
    }

    @Override
    public List<Member> getMemberListByWord(String word, Pageable pageable) {
        List<Member> memberList = null;
        if (word == null) {
            word = "";
        }
        memberList = memberRepository.findAllByNicknameContains(word, pageable);
        return memberList;
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
        member.setAddressDetail(memberUpdatePostReq.getAddressDetail());
        member.setPhone(memberUpdatePostReq.getPhone());
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
    public Member getMemberByMemberIdAndEmail(MemberSetNewPwdCheckPostReq memberSetNewPwdCheckPostReq) {
        return memberRepository.findByMemberIdAndEmail(memberSetNewPwdCheckPostReq.getMemberId(), memberSetNewPwdCheckPostReq.getEmail());
    }

    @Override
    public Member getMemberByPhone(String phone) {
        return memberRepository.findByPhone(phone);
    }

    @Override
    public int sendEmail(int randNum, String email) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(email);
            message.setFrom("etminho12@naver.com");
            message.setSubject("[더민트] 비밀번호 찾기 - 인증번호 안내드립니다.");
            message.setText("인증번호 : " + randNum);
            sender.send(message);
            return 1;
        } catch (Exception e) {
            e.printStackTrace();
            return 0;
        }
    }

    @Override
    public int setNewPassword(MemberSetNewPwdPatchReq memberSetNewPwdPatchReq) {
        Member member = memberRepository.findByMemberId(memberSetNewPwdPatchReq.getMemberId());
        if (member != null) {
            Long seq = member.getSeq();
            memberRepository.updateMemberPassword(seq, passwordEncoder.encode(memberSetNewPwdPatchReq.getPwd()));
            return 1;
        }
        return 0;
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
