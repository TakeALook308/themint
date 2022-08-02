package com.takealook.db.repository;

import com.takealook.db.entity.MemberKeyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberKeywordRepository extends JpaRepository<MemberKeyword, Long> {
    Optional<MemberKeyword> findByMemberSeq(int memberSeq);
}