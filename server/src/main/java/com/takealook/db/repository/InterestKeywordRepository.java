package com.takealook.db.repository;

import com.takealook.db.entity.InterestKeyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface InterestKeywordRepository extends JpaRepository<InterestKeyword, Long> {
    InterestKeyword findByMemberSeqAndKeywordName(Long memberSeq, String keywordName);
    Optional<List<InterestKeyword>> findAllByMemberSeq(Long memberSeq);
    @Transactional
    void deleteByMemberSeqAndKeywordName(Long memberSeq, String keywordName);
}