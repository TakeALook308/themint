package com.takealook.api.service;


import com.takealook.db.entity.AuctionImage;

import java.util.List;

public interface AuctionImageService {
    AuctionImage getBaseImage();
    List<AuctionImage> getAuctionImageListByAuctionSeq(Long auctionSeq);
    void updateAuctionImageList(Long auctionSeq, List<AuctionImage> auctionImageList);
    void deleteAuctionImageList(Long auctionSeq);
}
