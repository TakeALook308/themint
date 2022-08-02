package com.takealook.api.service;

import com.takealook.api.request.AuctionRegisterPostReq;
import com.takealook.api.request.AuctionUpdatePostReq;
import com.takealook.common.model.request.BaseSearchRequest;
import com.takealook.db.entity.Auction;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuctionServiceImpl implements AuctionService{
    @Override
    public Auction createAuction(Long memberSeq, AuctionRegisterPostReq auctionRegisterPostReq) {
        return null;
    }

    @Override
    public Auction getAuctionBySeq(Long auctionSeq) {
        return null;
    }

    @Override
    public List<Auction> getAuctionList(BaseSearchRequest baseSearchRequest) {
        return null;
    }

    @Override
    public void updateAuction(Long auctionSeq, AuctionUpdatePostReq auctionUpdatePostReq) {

    }

    @Override
    public void deleteAuction(Long auctionSeq) {

    }
}
