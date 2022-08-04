package com.takealook.api.service;

import com.takealook.db.entity.AuctionImage;
import com.takealook.db.repository.AuctionImageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuctionImageServiceImpl implements AuctionImageService{

    @Autowired
    AuctionImageRepository auctionImageRepository;

    @Override
    public List<AuctionImage> getAuctionImageListByAuctionSeq(Long auctionSeq) {
        List<AuctionImage> auctionImageList = auctionImageRepository.findByAuctionSeq(auctionSeq).orElse(null);
        return auctionImageList;
    }
}
