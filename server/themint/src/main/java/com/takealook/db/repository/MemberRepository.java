package com.takealook.db.repository;

import com.takealook.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    Optional<Member> findBySeq(Long seq);
    Member findByMemberId(String memberId);
    void deleteByMemberId(String memberId);
}
