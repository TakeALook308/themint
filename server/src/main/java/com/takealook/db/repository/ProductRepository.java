package com.takealook.db.repository;

import com.takealook.db.entity.Member;
import com.takealook.db.entity.Product;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository  extends JpaRepository<Product, Long> {
    Product findBySeq(Long productSeq);
    Optional<List<Product>> findByAuctionSeq(Long auctionSeq);
    @Query("SELECT p FROM Product p JOIN Auction a ON p.auctionSeq = a.seq WHERE p.productName LIKE CONCAT('%', :word, '%') AND a.startTime > :currentTime")
    List<Product> findAllByProductNameContainsAndStartTimeAfter(String word, String currentTime, Pageable pageable);
    @Query("SELECT p FROM Product p JOIN Auction a ON p.auctionSeq = a.seq WHERE p.productName LIKE CONCAT('%', :word, '%') AND a.startTime > :currentTime ORDER BY a.startTime ASC")
    List<Product> findAllByProductNameContainsAndStartTimeAfterOrderByStartTime(String word, String currentTime, Pageable pageable);
    @Query("SELECT p FROM Product p JOIN Auction a ON p.auctionSeq = a.seq WHERE p.productName LIKE CONCAT('%', :word, '%') AND a.startTime > :currentTime")
    List<Product> findAllByProductNameContainsAndStartTimeAfterOrderByAuctionSeq(String word, String currentTime, Pageable pageable);
    @Query("SELECT p FROM Product p JOIN Auction a ON p.auctionSeq = a.seq WHERE p.productName LIKE CONCAT('%', :word, '%') AND a.startTime > :currentTime ORDER BY a.interest DESC")
    List<Product> findAllByProductNameContainsAndStartTimeAfterOrderByInterest(String word, String currentTime, Pageable pageable);
    @Query(value = "SELECT * FROM product p LEFT JOIN (SELECT a.seq, a.start_time, m.score FROM auction a JOIN member m ON a.member_seq = m.seq) j ON p.auction_seq = j.seq WHERE p.product_name LIKE CONCAT('%', :word, '%') AND j.start_time > :currentTime ORDER BY j.score DESC", nativeQuery = true)
    List<Product> findAllByProductNameContainsAndStartTimeAfterOrderByScore(String word, String currentTime, Pageable pageable);
    @Transactional
    void deleteAllByAuctionSeq(Long auctionSeq);
}
