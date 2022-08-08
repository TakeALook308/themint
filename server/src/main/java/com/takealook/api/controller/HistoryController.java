package com.takealook.api.controller;

import com.takealook.api.response.HistoryListEntityRes;
import com.takealook.api.response.ProductListEntityRes;
import com.takealook.api.service.*;
import com.takealook.common.auth.MemberDetails;
import com.takealook.db.entity.*;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;

@Api(value = "판매/구매내역 API", tags = {"History"})
@RestController
@RequestMapping("/history")
public class HistoryController {

    @Autowired
    HistoryService historyService;

    @Autowired
    ProductService productService;

    @Autowired
    AuctionService auctionService;

    @Autowired
    AuctionImageService auctionImageService;

    @Autowired
    MemberService memberService;

    @GetMapping("/sales")
    public ResponseEntity<List<HistoryListEntityRes>> getProductList(@RequestParam("page") int page, @RequestParam("size") int size, @ApiIgnore Authentication authentication) {
        List<HistoryListEntityRes> historyListEntityResList = new ArrayList<>();
        List<History> historyList = null;

        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        Pageable pageable = PageRequest.of(page, size);
        historyList = historyService.getHistoryListByMemberSeq(memberSeq, pageable, 0); // 0: sales, 1: purchase
        for (History history : historyList) {
            Product product = productService.getProductBySeq(history.getProductSeq());
            Auction auction = auctionService.getAuctionBySeq(product.getAuctionSeq());
            Member member = memberService.getMemberByMemberSeq(history.getMemberSeq());
            List<AuctionImage> auctionImageList = auctionImageService.getAuctionImageListByAuctionSeq(auction.getSeq());
            historyListEntityResList.add(HistoryListEntityRes.of(history, product, auction, member, auctionImageList.get(0)));
        }
        return ResponseEntity.status(200).body(historyListEntityResList);
    }
}
