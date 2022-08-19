package com.takealook.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class AuctionListRes {
    Boolean hasMore;
    Boolean isInterest;
    Long categorySeq;
    List<AuctionListEntityRes> resultList;

    public static AuctionListRes of(List<AuctionListEntityRes> auctionResList, Boolean isInterest, Long categorySeq, Boolean hasMore){
        AuctionListRes res = AuctionListRes.builder()
                .hasMore(hasMore)
                .isInterest(isInterest)
                .categorySeq(categorySeq)
                .resultList(auctionResList)
                .build();
        return res;
    }
}
