package com.takealook.common.util;

import com.takealook.api.service.AuctionService;
import com.takealook.api.service.HistoryService;
import com.takealook.api.service.MemberService;
import com.takealook.api.service.ProductService;
import com.takealook.db.entity.Auction;
import com.takealook.db.entity.History;
import com.takealook.db.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Scheduler {

    @Autowired
    AuctionService auctionService;

    @Autowired
    ProductService productService;

    @Autowired
    MemberService memberService;

    @Autowired
    HistoryService historyService;

    @Scheduled(fixedDelay = 3600000)
    public void checkNotOpenedAuction(){
        List<Auction> auctionList = auctionService.getAuctionListByStartTimeAndStatus(0);
        for (Auction auction : auctionList){
            auctionService.updateAuctionStatus(auction.getSeq(), 3);
            List<Product> productList = productService.getProductListByAuctionSeq(auction.getSeq());
            for (Product product : productList){
                productService.updateStatus(product.getSeq(), 4); // 물품들은 유찰 상태로 변경
            }
            memberService.updateMemberScore(auction.getMemberSeq(), -3);
        }
    }

    @Scheduled(fixedDelay = 3600000)
    public void checkNotRemittedPurchase(){
        List<History> historyList = historyService.getHistoryByDateAndSalesPurchase(); // 구매한지 일주일 지난 목록 가져옴
        for (History history : historyList){
            Product product = productService.getProductBySeq(history.getProductSeq());
            if(product.getStatus() == 1) { // 입금대기 중이면
                productService.updateStatus(product.getSeq(), 5);
                memberService.updateMemberScore(history.getMemberSeq(), -5);
            }
        }
    }
}
