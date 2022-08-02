package com.takealook.api.service;

import com.takealook.api.request.*;
import com.takealook.common.model.request.BaseSearchRequest;
import com.takealook.db.entity.Auction;
import com.takealook.db.entity.Member;

import java.util.List;

public interface AuctionService {
    Auction createAuction(Long memberSeq, AuctionRegisterPostReq auctionRegisterPostReq);
    Auction getAuctionBySeq(Long auctionSeq);
    List<Auction> getAuctionList(BaseSearchRequest baseSearchRequest);
    void updateAuction(Long auctionSeq, AuctionUpdatePostReq auctionUpdatePostReq);
    void deleteAuction(Long auctionSeq);
}
