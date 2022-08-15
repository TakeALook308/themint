package com.takealook.api.service;

import com.takealook.common.exception.auction.AuctionNotFoundException;
import com.takealook.common.exception.code.ErrorCode;
import com.takealook.common.exception.interest.InterestDuplicateException;
import com.takealook.db.entity.Auction;
import com.takealook.db.entity.InterestAuction;
import com.takealook.db.repository.AuctionRepository;
import com.takealook.db.repository.InterestAuctionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InterestAuctionServiceImpl implements InterestAuctionService {
    @Autowired
    InterestAuctionRepository interestAuctionRepository;

    @Autowired
    AuctionRepository auctionRepository;

    @Override
    public void createInterestAuction(Long memberSeq, String hash) {
        InterestAuction check = interestAuctionRepository.findByMemberSeqAndHash(memberSeq, hash);
        if (check != null) {
            throw new InterestDuplicateException("interest auction with hash " + hash + " duplicated", ErrorCode.INTEREST_DUPLICATION);
        }
        InterestAuction interestAuction = InterestAuction.builder()
                .memberSeq(memberSeq)
                .hash(hash)
                .build();
        interestAuctionRepository.save(interestAuction);
        // 경매 인기도 증가
        Auction auction = auctionRepository.findByHash(hash).orElse(null);
        if (auction != null) {
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
        } else {
            throw new AuctionNotFoundException("auction with hash " + hash + " not found", ErrorCode.AUCTION_NOT_FOUND);
        }
    }

    @Override
    public List<Auction> getInterestAuctionListByMemberSeq(Long memberSeq, Pageable pageable) {
        List<InterestAuction> interestAuctionList = interestAuctionRepository.findAllByMemberSeq(memberSeq, pageable);
        List<Auction> auctionList = new ArrayList<>();
        for (InterestAuction interestAuction : interestAuctionList) {
            Auction auction = auctionRepository.findByHash(interestAuction.getHash()).get();
            if (auction != null) {
                auctionList.add(auction);
            } else {
                throw new AuctionNotFoundException("auction with hash " + interestAuction.getHash() + " not found", ErrorCode.AUCTION_NOT_FOUND);
            }
        }
        return auctionList;
    }

    @Override
    public void deleteAuction(Long memberSeq, String hash) {
        // 경매 인기도 감소
        Auction auction = auctionRepository.findByHash(hash).orElse(null);
        if (auction != null) {
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
        } else {
            throw new AuctionNotFoundException("auction with hash " + hash + " not found", ErrorCode.AUCTION_NOT_FOUND);
        }
        interestAuctionRepository.deleteByMemberSeqAndHash(memberSeq, hash);
    }

    @Override
    public Boolean checkInterestByMemberSeq(Long memberSeq, String auctionHash) {
        InterestAuction interestAuction = interestAuctionRepository.findByMemberSeqAndHash(memberSeq, auctionHash);
        if(interestAuction == null){
            return false;
        } else {
            return true;
        }
    }

    @Override
    public List<String> getMemberListByHash(String hash) {
        return interestAuctionRepository.getMemberListByAuctionHash(hash);
    }
}
