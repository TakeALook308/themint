package com.takealook.db.repository;

import com.takealook.db.entity.MemberKeyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface MemberKeywordRepository extends JpaRepository<MemberKeyword, Long> {
    Optional<List<MemberKeyword>> findAllByMemberSeq(Long memberSeq);
    @Transactional
    void deleteByMemberSeqAndKeywordName(Long memberSeq, String keywordName);
}