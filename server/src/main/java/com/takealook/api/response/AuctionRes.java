package com.takealook.api.response;

import com.takealook.db.entity.Auction;
import com.takealook.db.entity.AuctionImage;
import com.takealook.db.entity.Member;
import com.takealook.db.entity.Product;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
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
    @ApiModelProperty(name="Auction")
    Long seq;
    Long memberSeq;
    String title;
    String content;
    Long categorySeq;
    String startTime;
    List<Product> productList;
    List<AuctionImage> auctionImageList;
    String profileUrl;

    public static AuctionRes of(Auction auction, List<Product> productList, List<AuctionImage> auctionImageList, Member member){
        AuctionRes res = AuctionRes.builder()
                .seq(auction.getSeq())
                .memberSeq(auction.getMemberSeq())
                .title(auction.getTitle())
                .content(auction.getContent())
                .categorySeq(auction.getCategorySeq())
                .startTime(auction.getStartTime())
                .productList(productList)
                .auctionImageList(auctionImageList)
                .profileUrl(member.getProfileUrl())
                .build();
        return res;
    }
}
