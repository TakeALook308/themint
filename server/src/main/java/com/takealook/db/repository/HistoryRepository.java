package com.takealook.db.repository;

import com.takealook.db.entity.History;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {
    // 판매 내역 조회
    @Query(value = "SELECT * FROM history h LEFT JOIN (SELECT a.start_time, p.auction_seq, p.seq, p.status FROM auction a JOIN product p ON a.seq = p.auction_seq) j ON h.product_seq = j.seq WHERE h.member_seq = :memberSeq AND h.sales_purchase = 0  AND j.status <= :status ORDER BY j.start_time DESC", nativeQuery = true)
    List<History> findSalesByMemberSeqAndStatusSmallerOrderByStartTime(Long memberSeq, int status, Pageable pageable);
    @Query(value = "SELECT * FROM history h LEFT JOIN (SELECT a.start_time, p.auction_seq, p.seq, p.status FROM auction a JOIN product p ON a.seq = p.auction_seq) j ON h.product_seq = j.seq WHERE h.member_seq = :memberSeq AND h.sales_purchase = 0 AND j.status >= :status ORDER BY j.start_time DESC", nativeQuery = true)
    List<History> findSalesByMemberSeqAndStatusBiggerOrderByStartTime(Long memberSeq, int status, Pageable pageable);
    List<History> findAllByDateAfterAndDateBeforeAndSalesPurchase(String minTime, String maxTime, int salesPurchase);
    // 구매 내역 조회
    @Query(value = "SELECT * FROM history h LEFT JOIN (SELECT a.start_time, p.auction_seq, p.seq, p.status FROM auction a JOIN product p ON a.seq = p.auction_seq) j ON h.product_seq = j.seq WHERE h.member_seq = :memberSeq AND h.sales_purchase = 1 AND j.status <= :status ORDER BY h.seq", nativeQuery = true)
    List<History> findPurchaseByMemberSeqAndStatusSmallerOrderBySeq(Long memberSeq, int status, Pageable pageable);
    @Query(value = "SELECT * FROM history h LEFT JOIN (SELECT a.start_time, p.auction_seq, p.seq, p.status FROM auction a JOIN product p ON a.seq = p.auction_seq) j ON h.product_seq = j.seq WHERE h.member_seq = :memberSeq AND h.sales_purchase = 1 AND j.status >= :status ORDER BY h.seq", nativeQuery = true)
    List<History> findPurchaseByMemberSeqAndStatusBiggerOrderBySeq(Long memberSeq, int status, Pageable pageable);
    History findBySeq(Long historySeq);
    History findByProductSeqAndSalesPurchase(Long productSeq, int salesPurchase);
    @Transactional // update, delete 필수
    @Modifying(clearAutomatically = true) // 영속성 컨텍스트 초기화
    void deleteByProductSeqAndSalesPurchase(Long productSeq, int salesPurchase);
}
