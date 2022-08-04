package com.takealook.api.service;


import com.takealook.db.entity.AuctionImage;

import java.util.List;

public interface AuctionImageService {
    List<AuctionImage> getAuctionImageListByAuctionSeq(Long auctionSeq);
    void updateAuctionImageList(List<AuctionImage> auctionImageList);
    void deleteAuctionImageList(Long auctionSeq);
}
