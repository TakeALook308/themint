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
    public AuctionImage getBaseImage() {
        AuctionImage baseImage = auctionImageRepository.findBySeq(1L);
        return baseImage;
    }

    @Override
    public List<AuctionImage> getAuctionImageListByAuctionSeq(Long auctionSeq) {
        List<AuctionImage> auctionImageList = auctionImageRepository.findByAuctionSeq(auctionSeq).orElse(null);
        return auctionImageList;
    }

    @Override
    public void updateAuctionImageList(Long auctionSeq, List<AuctionImage> auctionImageList) {
        auctionImageRepository.deleteAllByAuctionSeq(auctionSeq);
        for(AuctionImage auctionImage : auctionImageList){
            if(auctionImage.getSeq() != null || auctionImage.getSeq() != 0){
                auctionImageRepository.save(auctionImage);
            } else{
                AuctionImage newAuctionImage = AuctionImage.builder()
                        .auctionSeq(auctionImage.getAuctionSeq())
                        .imageUrl(auctionImage.getImageUrl())
                        .build();
                auctionImageRepository.save(newAuctionImage);
            }
        }
    }

    @Override
    public void deleteAuctionImageList(Long auctionSeq) {
        auctionImageRepository.deleteAllByAuctionSeq(auctionSeq);
    }
}
