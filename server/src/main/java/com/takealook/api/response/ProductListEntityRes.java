package com.takealook.api.response;

import com.takealook.db.entity.Auction;
import com.takealook.db.entity.AuctionImage;
import com.takealook.db.entity.Member;
import com.takealook.db.entity.Product;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ProductListEntityRes {
    Long productSeq;
    String productName;
    int startPrice;
    Long auctionSeq;
    String startTime;
    Long memberSeq;
    String profileUrl;
    AuctionImage auctionImage;

    public static ProductListEntityRes of(Product product, Auction auction, Member member, AuctionImage auctionImage){
        ProductListEntityRes res = ProductListEntityRes.builder()
                .productSeq(product.getSeq())
                .productName(product.getProductName())
                .startPrice(product.getStartPrice())
                .auctionSeq(product.getAuctionSeq())
                .startTime(auction.getStartTime())
                .memberSeq(auction.getMemberSeq())
                .profileUrl(member.getProfileUrl())
                .auctionImage(auctionImage)
                .build();
        return res;
    }
}
