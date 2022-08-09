package com.takealook.db.repository;

import com.takealook.db.entity.Auction;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Long> {
    Optional<Auction> findByMemberSeq(Long memberSeq);
    Optional<Auction> findByHash(String hash);
    Optional<Auction> findBySeq(Long auctionSeq);
    Auction findFirstByMemberSeqOrderBySeqDesc(Long memberSeq);
    List<Auction> findAllByStatusAndStartTimeBefore(int status, String currentTime);
    List<Auction> findAllByStartTimeAfter(String currentTime, Pageable pageable);
    List<Auction> findAllByTitleContainsOrContentContainsAndStartTimeAfter(String titleWord, String contentWord, String currentTime, Pageable pageable);
    @Query("SELECT a FROM Auction a JOIN Member m ON a.memberSeq = m.seq where a.categorySeq = :categorySeq AND a.startTime > :currentTime ORDER BY m.score DESC")
    List<Auction> findAllByCategorySeqAndStartTimeAfterOrderByMemberScore(Long categorySeq, String currentTime, Pageable pageable);
    List<Auction> findAllByCategorySeqAndStartTimeAfter(Long categorySeq, String currentTime, Pageable pageable);
    @Query("SELECT a FROM Auction a JOIN Member m ON a.memberSeq = m.seq where a.title like CONCAT('%', :word, '%') OR a.content like CONCAT('%', :word, '%') AND a.startTime > :currentTime ORDER BY m.score DESC")
    List<Auction> findAllByTitleOrContentContainsAndStartTimeAfterOrderByMemberScore(String word, String currentTime, Pageable pageable);
    @Query("SELECT a FROM Auction a JOIN Member m ON a.memberSeq = m.seq where a.startTime > :currentTime ORDER BY m.score DESC")
    List<Auction> findAllByStartTimeAfterOrderByMemberScore(String currentTime, Pageable pageable);
}