package com.takealook.api.service;

import com.takealook.db.entity.Auction;

import java.util.List;

public interface InterestAuctionService {
    int createInterestAuction(Long memberSeq, Long auctionSeq);
    List<Auction> getInterestAuctionListByMemberSeq(Long memberSeq);
    int deleteAuction(Long memberSeq, Long auctionSeq);
}
