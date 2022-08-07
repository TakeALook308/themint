package com.takealook.db.repository;

import com.takealook.db.entity.InterestAuction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface InterestAuctionRepository extends JpaRepository<InterestAuction, Long> {
    InterestAuction findByMemberSeqAndAuctionSeq(Long memberSeq, Long auctionSeq);

    @Transactional
    int deleteByMemberSeqAndAuctionSeq(Long memberSeq, Long auctionSeq);
}
