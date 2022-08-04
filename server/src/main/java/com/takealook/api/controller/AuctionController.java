package com.takealook.api.controller;

import com.takealook.api.request.AuctionRegisterPostReq;
import com.takealook.api.request.AuctionUpdatePatchReq;
import com.takealook.api.response.AuctionRes;
import com.takealook.api.service.AuctionImageService;
import com.takealook.api.service.AuctionService;
import com.takealook.api.service.MemberService;
import com.takealook.api.service.ProductService;
import com.takealook.common.auth.MemberDetails;
import com.takealook.common.model.response.BaseResponseBody;
import com.takealook.common.util.JwtAuthenticationUtil;
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

    @Autowired
    JwtAuthenticationUtil jwtAuthenticationUtil;

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

    @GetMapping("/{auctionSeq}")
    public ResponseEntity<AuctionRes> getAuctionDetail(@PathVariable Long auctionSeq){
        Auction auction = auctionService.getAuctionBySeq(auctionSeq);
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
        productService.updateProductList(auctionUpdatePatchReq.getProductList());
        auctionImageService.updateAuctionImageList(auctionUpdatePatchReq.getAuctionImageList());
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));

        // 물품이나 사진이 삭제되는 경우도 고려
    }

    @DeleteMapping("/{auctionSeq}")
    public ResponseEntity<? extends BaseResponseBody> deleteAuction(@PathVariable Long auctionSeq,@ApiIgnore Authentication authentication){
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        productService.deleteProductList(auctionSeq);
        auctionImageService.deleteAuctionImageList(auctionSeq);
        auctionService.deleteAuction(memberSeq, auctionSeq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }
}
