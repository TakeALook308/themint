package com.takealook.api.service;

import com.takealook.api.request.AuctionRegisterPostReq;
import com.takealook.api.request.AuctionUpdatePatchReq;
import com.takealook.db.entity.Auction;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AuctionService {
    Auction createAuction(Long memberSeq, AuctionRegisterPostReq auctionRegisterPostReq);
    Auction getAuctionByHash(String hash);
    List<Auction> getLiveAuctionList(Pageable pageable);
    List<Auction> getAuctionList(String word, Pageable pageable);
    List<Auction> getAuctionListOrderByScore(String word, Pageable pageable);
    List<Auction> getAuctionListByCategorySeqOrderByScore(Long categorySeq, Pageable pageable);
    List<Auction> getAuctionListByCategorySeq(Long categorySeq, Pageable pageable);
    void updateAuction(Long memberSeq, AuctionUpdatePatchReq auctionUpdatePostReq);
    void deleteAuction(Long memberSeq, Long auctionSeq);
}