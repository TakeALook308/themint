package com.takealook.db.repository;

import com.takealook.db.entity.Auction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Long> {
    Optional<Auction> findByMemberSeq(Long memberSeq);
    Optional<Auction> findByHash(String hash);
    Optional<Auction> findBySeq(Long auctionSeq);
    Auction findFirstByMemberSeqOrderBySeqDesc(Long memberSeq);
    List<Auction> findAllByTitleContainsOrContentContains(String word, Pageable pageable);
}
