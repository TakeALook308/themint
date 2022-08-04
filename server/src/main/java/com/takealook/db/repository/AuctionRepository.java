package com.takealook.db.repository;

import com.takealook.db.entity.Auction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuctionRepository extends JpaRepository<Auction, Long> {
    Optional<Auction> findByMemberSeq(Long memberSeq);
    Optional<Auction> findBySeq(Long auctionSeq);
    Auction findFirstByMemberSeqOrderBySeqDesc(Long memberSeq);
}
