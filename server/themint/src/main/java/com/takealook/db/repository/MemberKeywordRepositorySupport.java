package com.takealook.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.takealook.db.entity.Member;
import com.takealook.db.entity.MemberKeyword;
import com.takealook.db.entity.QMember;
import com.takealook.db.entity.QMemberKeyword;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class MemberKeywordRepositorySupport{
    @Autowired
    private JPAQueryFactory jpaQueryFactory;
    QMemberKeyword qMemberKeyword = QMemberKeyword.memberKeyword;

    public Optional<List<MemberKeyword>> findKeywordNameByMemberSeq(Long memberSeq) {
        List<MemberKeyword> memberKeywordList = jpaQueryFactory.select(qMemberKeyword).from(qMemberKeyword).where(qMemberKeyword.memberSeq.eq(memberSeq)).fetch();
        if(memberKeywordList == null) return Optional.empty();
        return Optional.ofNullable(memberKeywordList);
    }


}