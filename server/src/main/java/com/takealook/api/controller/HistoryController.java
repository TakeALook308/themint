package com.takealook.api.controller;

import com.takealook.api.request.PurchaseRegisterPostReq;
import com.takealook.api.response.HistoryListEntityRes;
import com.takealook.api.response.HistoryListRes;
import com.takealook.api.response.PurchaseDetailRes;
import com.takealook.api.response.SalesDetailRes;
import com.takealook.api.service.*;
import com.takealook.common.auth.MemberDetails;
import com.takealook.common.model.response.BaseResponseBody;
import com.takealook.db.entity.*;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
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

    @Autowired
    ProductDeliveryService productDeliveryService;

    @GetMapping("/sales/inprogress/{memberSeq}")
    public ResponseEntity<HistoryListRes> getSalesHistoryInprogress(@PathVariable("memberSeq") Long memberSeq, @RequestParam("page") int page, @RequestParam("size") int size) {
        List<HistoryListEntityRes> historyListEntityResList = new ArrayList<>();
        Boolean hasMore = false;
        Pageable pageable = PageRequest.of(page, size);
        List<History> historyList = historyService.getHistoryListByMemberSeq(memberSeq, pageable, 0, 0); // 0: sales, 1: purchase
        List<History> hasMoreList = historyService.getHistoryListByMemberSeq(memberSeq, PageRequest.of(page + 1, size), 0, 0);
        if(hasMoreList.size() != 0) hasMore = true;
        for (History history : historyList) {
            Product product = productService.getProductBySeq(history.getProductSeq());
            Auction auction = auctionService.getAuctionBySeq(product.getAuctionSeq());
            Member member = memberService.getMemberByMemberSeq(history.getMemberSeq());
            List<AuctionImage> auctionImageList = auctionImageService.getAuctionImageListByAuctionSeq(auction.getSeq());
            historyListEntityResList.add(HistoryListEntityRes.of(history, product, auction, member, auctionImageList.get(0)));
        }
        return ResponseEntity.status(200).body(HistoryListRes.of(hasMore, historyListEntityResList));
    }

    @GetMapping("/sales/complete/{memberSeq}")
    public ResponseEntity<HistoryListRes> getSalesHistoryComplete(@PathVariable("memberSeq") Long memberSeq, @RequestParam("page") int page, @RequestParam("size") int size) {
        List<HistoryListEntityRes> historyListEntityResList = new ArrayList<>();
        Boolean hasMore = false;
        Pageable pageable = PageRequest.of(page, size);
        List<History> historyList = historyService.getHistoryListByMemberSeq(memberSeq, pageable, 0, 1); // 0: sales, 1: purchase
        List<History> hasMoreList = historyService.getHistoryListByMemberSeq(memberSeq, PageRequest.of(page + 1, size), 0, 1);
        if(hasMoreList.size() != 0) hasMore = true;
        for (History history : historyList) {
            Product product = productService.getProductBySeq(history.getProductSeq());
            Auction auction = auctionService.getAuctionBySeq(product.getAuctionSeq());
            Member member = memberService.getMemberByMemberSeq(history.getMemberSeq());
            List<AuctionImage> auctionImageList = auctionImageService.getAuctionImageListByAuctionSeq(auction.getSeq());
            historyListEntityResList.add(HistoryListEntityRes.of(history, product, auction, member, auctionImageList.get(0)));
        }
        return ResponseEntity.status(200).body(HistoryListRes.of(hasMore, historyListEntityResList));
    }

    @GetMapping("/sales/detail/{historySeq}")
    public ResponseEntity<SalesDetailRes> getSalesDetail(@PathVariable("historySeq") Long historySeq){
        History history = historyService.getHistoryBySeq(historySeq);
        Product product = productService.getProductBySeq(history.getProductSeq());
        System.out.println(product.getSeq());
        Long memberseq = historyService.getPurchaseByProductSeq(product.getSeq()).getMemberSeq();
        Member member = memberService.getMemberByMemberSeq(memberseq);
        ProductDelivery productDelivery = productDeliveryService.getProductDeliveryByProductSeq(product.getSeq());
        return ResponseEntity.status(200).body(SalesDetailRes.of(history, product, member, productDelivery));
    }

    @GetMapping("/purchase/inprogress")
    public ResponseEntity<HistoryListRes> getPurchaseHistoryInprogress(@RequestParam("page") int page, @RequestParam("size") int size, @ApiIgnore Authentication authentication) {
        List<HistoryListEntityRes> historyListEntityResList = new ArrayList<>();
        Boolean hasMore = false;
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        Pageable pageable = PageRequest.of(page, size);
        List<History> historyList = historyService.getHistoryListByMemberSeq(memberSeq, pageable, 1, 0); // 0: sales, 1: purchase
        List<History> hasMoreList = historyService.getHistoryListByMemberSeq(memberSeq, PageRequest.of(page + 1, size), 1, 0);
        if(hasMoreList.size() != 0) hasMore = true;
        for (History history : historyList) {
            Product product = productService.getProductBySeq(history.getProductSeq());
            Auction auction = auctionService.getAuctionBySeq(product.getAuctionSeq());
            Member member = memberService.getMemberByMemberSeq(history.getMemberSeq());
            List<AuctionImage> auctionImageList = auctionImageService.getAuctionImageListByAuctionSeq(auction.getSeq());
            historyListEntityResList.add(HistoryListEntityRes.of(history, product, auction, member, auctionImageList.get(0)));
        }
        return ResponseEntity.status(200).body(HistoryListRes.of(hasMore, historyListEntityResList));
    }

    @GetMapping("/purchase/complete")
    public ResponseEntity<HistoryListRes> getPurchaseHistoryComplete(@RequestParam("page") int page, @RequestParam("size") int size, @ApiIgnore Authentication authentication) {
        List<HistoryListEntityRes> historyListEntityResList = new ArrayList<>();
        Boolean hasMore = false;
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        Pageable pageable = PageRequest.of(page, size);
        List<History> historyList = historyService.getHistoryListByMemberSeq(memberSeq, pageable, 1, 1); // 0: sales, 1: purchase
        List<History> hasMoreList = historyService.getHistoryListByMemberSeq(memberSeq, PageRequest.of(page + 1, size), 1, 1);
        if(hasMoreList.size() != 0) hasMore = true;
        for (History history : historyList) {
            Product product = productService.getProductBySeq(history.getProductSeq());
            Auction auction = auctionService.getAuctionBySeq(product.getAuctionSeq());
            Member member = memberService.getMemberByMemberSeq(history.getMemberSeq());
            List<AuctionImage> auctionImageList = auctionImageService.getAuctionImageListByAuctionSeq(auction.getSeq());
            historyListEntityResList.add(HistoryListEntityRes.of(history, product, auction, member, auctionImageList.get(0)));
        }
        return ResponseEntity.status(200).body(HistoryListRes.of(hasMore, historyListEntityResList));
    }

    @PostMapping("/purchase")
    public ResponseEntity<BaseResponseBody> registerPurchase(@RequestBody PurchaseRegisterPostReq purchaseRegisterPostReq) {
        // 1. history에 구매 내역 추가하고,  2. productDelivery 추가 자동으로 추가하고,  3. product status 1로 바꾸고,  4. product finalPrice 낙찰가로 업데이트.
        int result = historyService.registerPurchaseHistory(purchaseRegisterPostReq);
        Member member = memberService.getMemberByMemberSeq(purchaseRegisterPostReq.getMemberSeq());
        productDeliveryService.setMemberInfo(member, purchaseRegisterPostReq.getProductSeq());
        productService.updateStatus(purchaseRegisterPostReq.getProductSeq(), 1); // 1: 입금대기
        productService.updateFinalPrice(purchaseRegisterPostReq.getProductSeq(), purchaseRegisterPostReq.getFinalPrice());
        if (result == 1) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
        }
        return ResponseEntity.status(409).body(BaseResponseBody.of(409, "상품 구매에 실패하였습니다."));
    }

    @GetMapping("/purchase/detail/{historySeq}")
    public ResponseEntity<PurchaseDetailRes> getPurchaseDetail(@PathVariable("historySeq") Long historySeq) {
        History history = historyService.getHistoryBySeq(historySeq);
        Product product = productService.getProductBySeq(history.getProductSeq());
        Long memberseq = historyService.getSalesByProductSeq(product.getSeq()).getMemberSeq();
        Member member = memberService.getMemberByMemberSeq(memberseq);
        ProductDelivery productDelivery = productDeliveryService.getProductDeliveryByProductSeq(product.getSeq());
        return ResponseEntity.status(200).body(PurchaseDetailRes.of(history, product, productDelivery, member));
    }
}
