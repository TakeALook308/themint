package com.takealook.api.controller;

import com.takealook.api.request.AuctionRegisterPostReq;
import com.takealook.api.request.AuctionUpdatePatchReq;
import com.takealook.api.response.AuctionListEntityRes;
import com.takealook.api.response.AuctionRes;
import com.takealook.api.service.AuctionImageService;
import com.takealook.api.service.AuctionService;
import com.takealook.api.service.MemberService;
import com.takealook.api.service.ProductService;
import com.takealook.common.auth.MemberDetails;
import com.takealook.common.model.request.BaseSearchRequest;
import com.takealook.common.model.response.BaseResponseBody;
import com.takealook.db.entity.Auction;
import com.takealook.db.entity.AuctionImage;
import com.takealook.db.entity.Member;
import com.takealook.db.entity.Product;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.awt.print.Pageable;
import java.util.ArrayList;
import java.util.List;

@Api(value = "경매 API", tags = {"Auction"})
@RestController
@RequestMapping("/api/auction")
public class AuctionController {

    @Autowired
    AuctionService auctionService;

    @Autowired
    MemberService memberService;

    @Autowired
    ProductService productService;

    @Autowired
    AuctionImageService auctionImageService;

    @PostMapping
    public ResponseEntity<BaseResponseBody> registerAuction(@RequestBody AuctionRegisterPostReq auctionRegisterPostReq, @ApiIgnore Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        Auction auction = auctionService.createAuction(memberSeq, auctionRegisterPostReq);
        if (auction == null) {
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "fail"));
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }

    @GetMapping("/{auctionHash}")
    public ResponseEntity<AuctionRes> getAuctionDetail(@PathVariable String auctionHash){
        Auction auction = auctionService.getAuctionByHash(auctionHash);
        Long auctionSeq = auction.getSeq();
        List<Product> productList = productService.getProductListByAuctionSeq(auctionSeq);
        List<AuctionImage> auctionImageList = auctionImageService.getAuctionImageListByAuctionSeq(auctionSeq);
        Member member = memberService.getMemberByMemberSeq(auction.getMemberSeq());

        return ResponseEntity.status(200).body(AuctionRes.of(auction, productList, auctionImageList, member));
    }

    @PatchMapping
    public ResponseEntity<? extends BaseResponseBody> modifyAuction(@RequestBody AuctionUpdatePatchReq auctionUpdatePatchReq, @ApiIgnore Authentication authentication){
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        auctionService.updateAuction(memberSeq, auctionUpdatePatchReq);
        productService.updateProductList(auctionUpdatePatchReq.getSeq(), auctionUpdatePatchReq.getProductList());
        auctionImageService.updateAuctionImageList(auctionUpdatePatchReq.getSeq(), auctionUpdatePatchReq.getAuctionImageList());
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));

        // 물품이나 사진이 삭제되는 경우도 고려
    }

    @DeleteMapping("/{auctionHash}")
    public ResponseEntity<? extends BaseResponseBody> deleteAuction(@PathVariable String auctionHash,@ApiIgnore Authentication authentication){
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        Long auctionSeq = auctionService.getAuctionByHash(auctionHash).getSeq();
        productService.deleteProductList(auctionSeq);
        auctionImageService.deleteAuctionImageList(auctionSeq);
        auctionService.deleteAuction(memberSeq, auctionSeq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }

    @GetMapping("/search")
    public ResponseEntity<List<AuctionListEntityRes>> getAuctionList(@RequestParam("word") String word, Pageable pageable){
        // [key] 최신순: date, 인기순: interest, 낮은가격순: price, 판매자신뢰도순: score
        List<AuctionListEntityRes> auctionListEntityResList = new ArrayList<>();
        List<Auction> auctionList = auctionService.getAuctionList(word, pageable);
        for (Auction auction : auctionList){
            Long memberSeq = auction.getMemberSeq();
            Member member = memberService.getMemberByMemberSeq(memberSeq);
            List<AuctionImage> auctionImageList = auctionImageService.getAuctionImageListByAuctionSeq(auction.getSeq());
            auctionListEntityResList.add(AuctionListEntityRes.of(auction, member, auctionImageList));
        }
        return ResponseEntity.status(200).body(auctionListEntityResList);
    }
}
