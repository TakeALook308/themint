package com.takealook.db.repository;

import com.takealook.db.entity.InterestAuction;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface InterestAuctionRepository extends JpaRepository<InterestAuction, Long> {
    InterestAuction findByMemberSeqAndHash(Long memberSeq, String hash);
    @Query(value = "SELECT * FROM interest_auction i LEFT JOIN auction a ON i.hash = a.hash WHERE i.member_seq = :memberSeq AND (a.start_time > :currentTime OR a.status = 1)", nativeQuery = true)
    List<InterestAuction> findAllByMemberSeqAndStartTimeAfterOrStatus(Long memberSeq, String currentTime, Pageable pageable);
    @Transactional // update, delete 필수
    @Modifying(clearAutomatically = true) // 영속성 컨텍스트 초기화
    int deleteByMemberSeqAndHash(Long memberSeq, String hash);

    @Query(value = "select member_id from member\n" +
            "join \n" +
            "(select * from interest_auction\n" +
            "where hash = :hash) tb\n" +
            "on member.seq = tb.member_seq", nativeQuery = true)
    List<String> getMemberListByAuctionHash(String hash);
}
