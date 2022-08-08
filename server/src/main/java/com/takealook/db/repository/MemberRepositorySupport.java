package com.takealook.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.takealook.api.request.MemberUpdatePostReq;
import com.takealook.db.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.takealook.db.entity.QMember;

import javax.transaction.Transactional;
import java.util.Optional;

@Repository
public class MemberRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QMember qMember = QMember.member;

    public Optional<Member> findMemberBySeq(Long seq) {
        Member member = jpaQueryFactory.select(qMember).from(qMember).where(qMember.seq.eq(seq)).fetchOne();
        if(member == null) return Optional.empty();
        return Optional.ofNullable(member);
    }

    @Transactional
    public void updateMemberScore(Long seq, int score) {
//        long member = jpaQueryFactory.update(qMember).set(qMember.score, score).where(qMember.seq.eq(seq)).execute();
        long affectedRow = jpaQueryFactory.update(qMember).where(qMember.seq.eq(seq)).set(qMember.score, score).execute();
    }

    @Transactional
    public void updateMemberInfo(Long seq, MemberUpdatePostReq memberUpdatePostReq) {
        long affectedRow = jpaQueryFactory.update(qMember).where(qMember.seq.eq(seq))
                .set(qMember.nickname, memberUpdatePostReq.getNickname())
                .set(qMember.email, memberUpdatePostReq.getEmail())
                .set(qMember.address, memberUpdatePostReq.getAddress())
                .set(qMember.phone, memberUpdatePostReq.getPhone())
                .set(qMember.profileUrl, memberUpdatePostReq.getProfileUrl())
                .set(qMember.bankCode, memberUpdatePostReq.getBankCode())
                .set(qMember.accountNo, memberUpdatePostReq.getAccountNo())
                .set(qMember.noticeKakao, memberUpdatePostReq.getNoticeKakao())
                .set(qMember.noticeEmail, memberUpdatePostReq.getNoticeEmail())
                .execute();
    }

    @Transactional
    public void updateMemberPassword(Long seq, String pwd) {
        long affectedRow = jpaQueryFactory.update(qMember).where(qMember.seq.eq(seq))
                .set(qMember.pwd, pwd)
                .execute();
    }
}
