package com.takealook.api.service;

import com.takealook.api.request.AuctionImageRegisterPostReq;
import com.takealook.api.request.AuctionRegisterPostReq;
import com.takealook.api.request.AuctionUpdatePatchReq;
import com.takealook.api.request.ProductRegisterPostReq;
import com.takealook.common.model.request.BaseSearchRequest;
import com.takealook.common.util.HashUtil;
import com.takealook.db.entity.Auction;
import com.takealook.db.entity.AuctionImage;
import com.takealook.db.entity.Product;
import com.takealook.db.repository.AuctionImageRepository;
import com.takealook.db.repository.AuctionRepository;
import com.takealook.db.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AuctionServiceImpl implements AuctionService {

    @Autowired
    AuctionRepository auctionRepository;

    @Autowired
    ProductRepository productRepository;

    @Autowired
    AuctionImageRepository auctionImageRepository;

    @Override
    public Auction createAuction(Long memberSeq, AuctionRegisterPostReq auctionRegisterPostReq) {
        // 화상회의 링크 생성해야 함!!!!!!!!!!!!!!!!!!!!!!!!!!

        // title, content, categorySeq, startTime, productlist(productname, startprice), auctionImagelist(imageurl)
        Auction auction = Auction.builder()
                .hash(HashUtil.MD5(LocalDateTime.now().toString() + memberSeq))
                .memberSeq(memberSeq)
                .title(auctionRegisterPostReq.getTitle())
                .content(auctionRegisterPostReq.getContent())
                .categorySeq(auctionRegisterPostReq.getCategorySeq())
                .startTime(auctionRegisterPostReq.getStartTime())
                .build();
        auctionRepository.save(auction);

        // 방금 저장한 경매 seq 뽑아서 product, auctionimage에 넣어야 함
        auction = auctionRepository.findFirstByMemberSeqOrderBySeqDesc(memberSeq);

        for (ProductRegisterPostReq productRegisterPostReq : auctionRegisterPostReq.getProductList()) {
            Product product = Product.builder()
                    .auctionSeq(auction.getSeq())
                    .productName(productRegisterPostReq.getProductName())
                    .startPrice(productRegisterPostReq.getStartPrice())
                    .status(0)
                    .build();
            productRepository.save(product);
        }

        for (AuctionImageRegisterPostReq auctionImageRegisterPostReq : auctionRegisterPostReq.getAuctionImageList()) {
            AuctionImage auctionImage = AuctionImage.builder()
                    .auctionSeq(auction.getSeq())
                    .imageUrl(auctionImageRegisterPostReq.getImageUrl())
                    .build();
            auctionImageRepository.save(auctionImage);
        }

        return auction;
    }

    @Override
    public Auction getAuctionByHash(String hash) {
        Auction auction = auctionRepository.findByHash(hash).get();
        return auction;
    }

    @Override
    public List<Auction> getAuctionList(BaseSearchRequest baseSearchRequest) {
        return null;
    }

    @Override
    public void updateAuction(Long memberSeq, AuctionUpdatePatchReq auctionUpdatePatchReq) {
        Auction auction = Auction.builder()
                .seq(auctionUpdatePatchReq.getSeq())
                .memberSeq(memberSeq)
                .title(auctionUpdatePatchReq.getTitle())
                .content(auctionUpdatePatchReq.getContent())
                .categorySeq(auctionUpdatePatchReq.getCategorySeq())
                .startTime(auctionUpdatePatchReq.getStartTime())
                .build();
        auctionRepository.save(auction);
    }

    @Override
    public void deleteAuction(Long memberSeq, Long auctionSeq) {
        Auction auction = auctionRepository.findBySeq(auctionSeq).orElse(null);
        if(auction != null && auction.getMemberSeq() == memberSeq){
            auctionRepository.delete(auction);
        } else{
            // 예외처리
        }
    }
}
