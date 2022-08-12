package com.takealook.api.service;

import com.takealook.db.entity.Auction;

import java.util.List;

public interface InterestAuctionService {
    void createInterestAuction(Long memberSeq, String hash);
    List<Auction> getInterestAuctionListByMemberSeq(Long memberSeq);
    void deleteAuction(Long memberSeq, String hash);
}
