package com.takealook.api.service;

import com.takealook.api.request.AuctionImageRegisterPostReq;
import com.takealook.api.request.AuctionRegisterPostReq;
import com.takealook.api.request.AuctionUpdatePostReq;
import com.takealook.api.request.ProductRegisterPostReq;
import com.takealook.common.model.request.BaseSearchRequest;
import com.takealook.db.entity.Auction;
import com.takealook.db.entity.AuctionImage;
import com.takealook.db.entity.Product;
import com.takealook.db.repository.AuctionImageRepository;
import com.takealook.db.repository.AuctionRepository;
import com.takealook.db.repository.AuctionRepositorySupport;
import com.takealook.db.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuctionServiceImpl implements AuctionService{

    @Autowired
    AuctionRepository auctionRepository;

    @Autowired
    AuctionRepositorySupport auctionRepositorySupport;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    AuctionImageRepository auctionImageRepository;

    @Override
    public Auction createAuction(Long memberSeq, AuctionRegisterPostReq auctionRegisterPostReq) {
        // title, content, categorySeq, startTime, productlist(productname, startprice), auctionImagelist(imageurl)
        Auction auction = Auction.builder()
                .memberSeq(memberSeq)
                .title(auctionRegisterPostReq.getTitle())
                .content(auctionRegisterPostReq.getContent())
                .categorySeq(auctionRegisterPostReq.getCategorySeq())
                .startTime(auctionRegisterPostReq.getStartTime())
                .build();
        auctionRepository.save(auction);

        // 방금 저장한 경매 seq 뽑아서 product, auctionimage에 넣어야 함


        for(ProductRegisterPostReq productRegisterPostReq : auctionRegisterPostReq.getProductList()){
            Product product = Product.builder()
                            .auctionSeq(1L) //임시값
                            .productName(productRegisterPostReq.getProductName())
                            .startPrice(productRegisterPostReq.getStartPrice())
                            .status(0)
                            .build();
            productRepository.save(product);
        }

        for(AuctionImageRegisterPostReq auctionImageRegisterPostReq : auctionRegisterPostReq.getAuctionImageList()){
            AuctionImage auctionImage = AuctionImage.builder()
                            .auctionSeq(1L) //임시값
                            .imageUrl(auctionImageRegisterPostReq.getImageUrl())
                            .build();
            auctionImageRepository.save(auctionImage);
        }

        return auction;
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
