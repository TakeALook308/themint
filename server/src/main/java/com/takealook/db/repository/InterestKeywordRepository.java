package com.takealook.db.repository;

import com.takealook.db.entity.InterestKeyword;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface InterestKeywordRepository extends JpaRepository<InterestKeyword, Long> {
    InterestKeyword findByMemberSeqAndKeywordName(Long memberSeq, String keywordName);
    Optional<List<InterestKeyword>> findAllByMemberSeq(Long memberSeq);
    @Transactional // update, delete 필수
    @Modifying(clearAutomatically = true) // 영속성 컨텍스트 초기화
    void deleteByMemberSeqAndKeywordName(Long memberSeq, String keywordName);

    @Query(value = "select member_id from member\n" +
            "join\n" +
            "(select distinct member_seq from interest_keyword\n" +
            "where :productName like concat('%', keyword_name, '%')) tb\n" +
            "on member.seq = tb.member_seq", nativeQuery = true)
    List<String> getMemeberListByProductName(String productName);
}