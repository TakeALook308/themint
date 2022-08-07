package com.takealook.api.service;

import com.takealook.db.entity.InterestAuction;
import com.takealook.db.entity.InterestCategory;

import java.util.List;

public interface InterestAuctionService {
    int createInterestAuction(Long memberSeq, Long auctionSeq);
    List<InterestAuction> getInterestAuctionListByMemberSeq(Long memberSeq);
    int deleteAuction(Long memberSeq, Long auctionSeq);
}
