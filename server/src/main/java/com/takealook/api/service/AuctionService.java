package com.takealook.api.service;

import com.takealook.api.request.AuctionRegisterPostReq;
import com.takealook.api.request.AuctionUpdatePatchReq;
import com.takealook.db.entity.Auction;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

public interface AuctionService {
    Auction createAuction(Long memberSeq, AuctionRegisterPostReq auctionRegisterPostReq, List<MultipartFile> multipartFileList);
    Auction getAuctionByHash(String hash);
    Auction getAuctionBySeq(Long auctionSeq);
    List<Auction> getLiveAuctionList();
    List<Auction> getAuctionList(String word, Pageable pageable);
    List<Auction> getAuctionListToday(Pageable pageable);
    List<Auction> getAuctionListOrderByScore(String word, Pageable pageable);
    List<Auction> getAuctionListByCategorySeqOrderByScore(Long categorySeq, Pageable pageable);
    List<Auction> getAuctionListByCategorySeq(Long categorySeq, Pageable pageable);
    List<Auction> getAuctionListByStartTimeAndStatus(int status);
    void updateAuctionStatus(Long auctionSeq, int status);
    Auction updateAuction(Long memberSeq, AuctionUpdatePatchReq auctionUpdatePostReq);
    void deleteAuction(Long auctionSeq);
}