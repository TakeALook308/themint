package com.takealook.api.response;

import com.takealook.db.entity.Auction;
import com.takealook.db.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class AuctionStandByRes {
    Long memberSeq;
    String memberId;
    String nickname;
    String profileUrl;
    String startTime;
    String title;

    public static AuctionStandByRes of(Auction auction, Member member){
        AuctionStandByRes res = AuctionStandByRes.builder()
                .memberSeq(member.getSeq())
                .memberId(member.getMemberId())
                .nickname(member.getNickname())
                .profileUrl(member.getProfileUrl())
                .startTime(auction.getStartTime())
                .title(auction.getTitle())
                .build();
        return res;
    }
}
