package com.takealook.api.service;


import com.takealook.db.entity.AuctionImage;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AuctionImageService {
    AuctionImage getBaseImage();
    List<AuctionImage> getAuctionImageListByAuctionSeq(Long auctionSeq);
    void updateAuctionImageList(Long auctionSeq, String hash, List<MultipartFile> multipartFileList);
    void deleteAuctionImageList(Long auctionSeq);
}
