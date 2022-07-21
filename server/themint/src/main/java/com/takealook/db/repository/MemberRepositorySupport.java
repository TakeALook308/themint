package com.takealook.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.takealook.db.entity.Member;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import com.takealook.db.entity.QMember;

import java.util.Optional;

@Repository
public class MemberRepositorySupport {
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QMember qMember = QMember.member;

    public Optional<Member> findMemberByMemberId(String member_id) {
        Member member = jpaQueryFactory.select(qMember).from(qMember).where(qMember.member_id.eq(member_id)).fetchOne();
        if(member == null) return Optional.empty();
        return Optional.ofNullable(member);
    }
}
