package com.takealook.api.response;

import com.takealook.db.entity.Auction;
import com.takealook.db.entity.AuctionImage;
import com.takealook.db.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class AuctionListEntityRes {
    Long auctionSeq;
    String hash;
    Long memberSeq;
    String title;
    String startTime;
    int interest;
    int status;
    AuctionImage auctionImage;
    String profileUrl;

    public static AuctionListEntityRes of(Auction auction, Member member, List<AuctionImage> auctionImageList){
        AuctionListEntityRes res = AuctionListEntityRes.builder()
                .auctionSeq(auction.getSeq())
                .hash(auction.getHash())
                .memberSeq(auction.getMemberSeq())
                .title(auction.getTitle())
                .startTime(auction.getStartTime())
                .interest(auction.getInterest())
                .status(auction.getStatus())
                .auctionImage(auctionImageList.get(0))
                .profileUrl(member.getProfileUrl())
                .build();
        return res;
    }
}
