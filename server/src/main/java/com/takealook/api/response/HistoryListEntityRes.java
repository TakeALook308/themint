package com.takealook.api.response;

import com.takealook.db.entity.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class HistoryListEntityRes {
    Long historySeq;
    Long productSeq;
    Long auctionSeq;
    String hash;
    String productName;
    int startPrice;
    int finalPrice;
    int status;
    String startTime;
    String profileUrl;
    AuctionImage auctionImage;

    public static HistoryListEntityRes of(History history, Product product, Auction auction, Member member, AuctionImage auctionImage){
        HistoryListEntityRes res = HistoryListEntityRes.builder()
                .historySeq(history.getSeq())
                .productSeq(history.getProductSeq())
                .auctionSeq(product.getAuctionSeq())
                .hash(auction.getHash())
                .productName(product.getProductName())
                .startPrice(product.getStartPrice())
                .finalPrice(product.getFinalPrice())
                .status(product.getStatus())
                .startTime(auction.getStartTime())
                .profileUrl(member.getProfileUrl())
                .auctionImage(auctionImage)
                .build();
        return res;
    }
}
