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
    List<AuctionListEntityRes> resultList;

    public static AuctionListRes of(List<AuctionListEntityRes> auctionResList, Boolean hasMore){
        AuctionListRes res = AuctionListRes.builder()
                .hasMore(hasMore)
                .resultList(auctionResList)
                .build();
        return res;
    }
}
