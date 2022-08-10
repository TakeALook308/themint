package com.takealook.db.repository;

import com.takealook.db.entity.InterestAuction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface InterestAuctionRepository extends JpaRepository<InterestAuction, Long> {
    InterestAuction findByMemberSeqAndAuctionSeq(Long memberSeq, Long auctionSeq);
    List<InterestAuction> findAllByMemberSeq(Long memberSeq);
    @Transactional
    int deleteByMemberSeqAndAuctionSeq(Long memberSeq, Long auctionSeq);
}
