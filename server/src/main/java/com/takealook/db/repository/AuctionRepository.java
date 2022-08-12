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
    List<Auction> findAllByMemberSeq(Long memberSeq);
    List<Auction> findAllByStatus(int status);
    List<Auction> findAllByStartTimeAfterAndStartTimeBeforeOrderByStartTimeAsc(String currentTime, String tomorrowTime, Pageable pageable);
    List<Auction> findAllByStatusOrStartTimeAfter(int status, String currentTime, Pageable pageable);
    List<Auction> findAllByStartTimeBeforeAndStatus(String currentTime, int status);
    @Query("SELECT a FROM Auction a JOIN Member m ON a.memberSeq = m.seq where ((a.title LIKE CONCAT('%', :titleWord, '%') OR a.content LIKE CONCAT('%', :contentWord, '%')) AND (a.startTime > :currentTime OR a.status = :status))")
    List<Auction> findAllByTitleContainsOrContentContainsAndStartTimeAfterOrStatus(String titleWord, String contentWord, String currentTime, int status, Pageable pageable);
    @Query("SELECT a FROM Auction a JOIN Member m ON a.memberSeq = m.seq where a.categorySeq = :categorySeq AND (a.startTime > :currentTime OR a.status = :status) ORDER BY m.score DESC")
    List<Auction> findAllByCategorySeqAndStartTimeAfterOrderByMemberScore(Long categorySeq, String currentTime, int status, Pageable pageable);
    @Query("SELECT a FROM Auction a WHERE a.categorySeq = :categorySeq AND (a.startTime > :currentTime OR a.status = :status)")
    List<Auction> findAllByCategorySeqAndStartTimeAfterOrStatus(Long categorySeq, String currentTime, int status, Pageable pageable);
    @Query("SELECT a FROM Auction a JOIN Member m ON a.memberSeq = m.seq where ((a.title like CONCAT('%', :word, '%') OR a.content like CONCAT('%', :word, '%')) AND (a.startTime > :currentTime OR a.status = :status)) ORDER BY m.score DESC")
    List<Auction> findAllByTitleOrContentContainsAndStartTimeAfterOrderByMemberScore(String word, String currentTime, int status, Pageable pageable);
    @Query("SELECT a FROM Auction a JOIN Member m ON a.memberSeq = m.seq where (a.startTime > :currentTime OR a.status = :status) ORDER BY m.score DESC")
    List<Auction> findAllByStartTimeAfterOrderByMemberScore(String currentTime, int status, Pageable pageable);
}