package com.takealook.api.response;

import com.takealook.db.entity.Auction;
import com.takealook.db.entity.AuctionImage;
import com.takealook.db.entity.Member;
import com.takealook.db.entity.Product;
import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * 경매 상세 조회 API ([GET] /api/auction/{auctionSeq}) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@Builder
@ApiModel("AuctionResponse")
public class AuctionRes {
    Long auctionSeq;
    String hash;
    Long memberSeq;
    String title;
    String content;
    Long categorySeq;
    String startTime;
    int interest;
    int status;
    List<Product> productList;
    List<AuctionImage> auctionImageList;
    String profileUrl;

    public static AuctionRes of(Auction auction, List<Product> productList, List<AuctionImage> auctionImageList, Member member){
        AuctionRes res = AuctionRes.builder()
                .auctionSeq(auction.getSeq())
                .hash(auction.getHash())
                .memberSeq(auction.getMemberSeq())
                .title(auction.getTitle())
                .content(auction.getContent())
                .categorySeq(auction.getCategorySeq())
                .startTime(auction.getStartTime())
                .interest(auction.getInterest())
                .status(auction.getStatus())
                .productList(productList)
                .auctionImageList(auctionImageList)
                .profileUrl(member.getProfileUrl())
                .build();
        return res;
    }
}
