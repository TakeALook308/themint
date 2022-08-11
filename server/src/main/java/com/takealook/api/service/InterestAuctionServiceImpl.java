package com.takealook.api.service;

import com.takealook.db.entity.Auction;
import com.takealook.db.entity.InterestAuction;
import com.takealook.db.repository.AuctionRepository;
import com.takealook.db.repository.InterestAuctionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InterestAuctionServiceImpl implements InterestAuctionService{
    @Autowired
    InterestAuctionRepository interestAuctionRepository;

    @Autowired
    AuctionRepository auctionRepository;

    @Override
    public int createInterestAuction(Long memberSeq, String hash) {
        InterestAuction check = interestAuctionRepository.findByMemberSeqAndHash(memberSeq, hash);
        if(check != null){
            return 0; // 이미 추가된 관심 경매
        }
        InterestAuction interestAuction = InterestAuction.builder()
                .memberSeq(memberSeq)
                .hash(hash)
                .build();
        interestAuctionRepository.save(interestAuction);
        // 경매 인기도 증가
        Auction auction = auctionRepository.findByHash(hash).orElse(null);
        if(auction != null){
            Auction auctionUpdate = Auction.builder()
                    .seq(auction.getSeq())
                    .hash(auction.getHash())
                    .memberSeq(auction.getMemberSeq())
                    .title(auction.getTitle())
                    .content(auction.getContent())
                    .categorySeq(auction.getCategorySeq())
                    .startTime(auction.getStartTime())
                    .status(auction.getStatus())
                    .interest(auction.getInterest() + 1)
                    .build();
            auctionRepository.save(auctionUpdate);
            return 1;
        }
        return 0;
    }

    @Override
    public List<Auction> getInterestAuctionListByMemberSeq(Long memberSeq) {
        List<InterestAuction> interestAuctionList = interestAuctionRepository.findAllByMemberSeq(memberSeq);
        List<Auction> auctionList = new ArrayList<>();
        for (InterestAuction interestAuction : interestAuctionList){
            auctionList.add(auctionRepository.findByHash(interestAuction.getHash()).get());
        }
        return auctionList;
    }

    @Override
    public int deleteAuction(Long memberSeq, String hash) {
        // 경매 인기도 감소
        Auction auction = auctionRepository.findByHash(hash).orElse(null);
        if(auction != null){
            Auction auctionUpdate = Auction.builder()
                    .seq(auction.getSeq())
                    .hash(auction.getHash())
                    .memberSeq(auction.getMemberSeq())
                    .title(auction.getTitle())
                    .content(auction.getContent())
                    .categorySeq(auction.getCategorySeq())
                    .startTime(auction.getStartTime())
                    .status(auction.getStatus())
                    .interest(auction.getInterest() - 1)
                    .build();
            auctionRepository.save(auctionUpdate);
        }
        int result = interestAuctionRepository.deleteByMemberSeqAndHash(memberSeq, hash);
        return result;
    }
}
