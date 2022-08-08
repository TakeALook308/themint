package com.takealook.db.repository;

import com.takealook.db.entity.History;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {
    @Query(value = "SELECT * FROM history h LEFT JOIN (SELECT a.start_time, p.auction_seq, p.seq FROM auction a JOIN product p ON a.seq = p.auction_seq) j ON h.product_seq = j.seq WHERE h.member_seq = :memberSeq ORDER BY j.start_time", nativeQuery = true)
    List<History> findAllByMemberSeqOrderByStartTime(Long memberSeq, Pageable pageable);
}
