package com.takealook.api.service;

import com.takealook.db.entity.Auction;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface InterestAuctionService {
    void createInterestAuction(Long memberSeq, String hash);
    List<Auction> getInterestAuctionListByMemberSeq(Long memberSeq, Pageable pageable);
    void deleteAuction(Long memberSeq, String hash);
    Boolean checkInterestByMemberSeq(Long memberSeq, String auctionHash);
    List<String> getMemberListByHash(String hash);
}
