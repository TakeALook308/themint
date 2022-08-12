package com.takealook.api.controller;

import com.takealook.api.request.AuctionRegisterPostReq;
import com.takealook.api.request.AuctionUpdatePatchReq;
import com.takealook.api.response.AuctionListEntityRes;
import com.takealook.api.response.AuctionListRes;
import com.takealook.api.response.AuctionRes;
import com.takealook.api.response.AuctionStandByRes;
import com.takealook.api.service.*;
import com.takealook.common.auth.MemberDetails;
import com.takealook.common.exception.auction.AuctionDeleteFailException;
import com.takealook.common.exception.auction.AuctionUpdateFailException;
import com.takealook.common.exception.code.ErrorCode;
import com.takealook.common.model.response.BaseResponseBody;
import com.takealook.db.entity.*;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import springfox.documentation.annotations.ApiIgnore;

import javax.annotation.Nullable;
import javax.security.auth.login.LoginContext;
import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Api(value = "경매 API", tags = {"Auction"})
@RestController
@RequestMapping("/auction")
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
    HistoryService historyService;

    @Autowired
    InterestCategoryService interestCategoryService;

    @PostMapping
    public ResponseEntity<?> registerAuction(@RequestPart("auctionInfo")AuctionRegisterPostReq auctionRegisterPostReq, @RequestPart(required = false) List<MultipartFile> auctionImageList, @ApiIgnore Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        Auction auction = auctionService.createAuction(memberSeq, auctionRegisterPostReq, auctionImageList);
        List<Product> productList = productService.getProductListByAuctionSeq(auction.getSeq());
        historyService.registerSalesHistory(memberSeq, productList);
        memberService.updateMemberScore(memberSeq, 1);
        if (auction == null) {
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "경매 생성에 실패하였습니다."));
        }
        return ResponseEntity.status(200).body(auction.getHash());
    }

    @GetMapping("/{auctionHash}")
    public ResponseEntity<AuctionRes> getAuctionDetail(@PathVariable String auctionHash) {
        Auction auction = auctionService.getAuctionByHash(auctionHash);
        Long auctionSeq = auction.getSeq();
        List<Product> productList = productService.getProductListByAuctionSeq(auctionSeq);
        List<AuctionImage> auctionImageList = auctionImageService.getAuctionImageListByAuctionSeq(auctionSeq);
        Member member = memberService.getMemberByMemberSeq(auction.getMemberSeq());

        return ResponseEntity.status(200).body(AuctionRes.of(auction, productList, auctionImageList, member));
    }

    @PatchMapping
    public ResponseEntity<? extends BaseResponseBody> modifyAuction(@RequestPart AuctionUpdatePatchReq auctionUpdatePatchReq,  @RequestPart(required = false) List<MultipartFile> auctionImageList,@ApiIgnore Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        if (LocalDateTime.parse(auctionUpdatePatchReq.getStartTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")).isBefore(LocalDateTime.now())) {
            throw new AuctionUpdateFailException("auction cannot be modified after its startTime", ErrorCode.AUCTION_UPDATE_FAIL);
        }
        // 1. 옥션 정보 수정
        Auction auction = auctionService.updateAuction(memberSeq, auctionUpdatePatchReq);
        // 2. 옥션 이미지 수정
        auctionImageService.updateAuctionImageList(auction.getSeq(), auction.getHash(), auctionImageList);
        // 3. 물건 삭제, 등록
        productService.updateProductList(memberSeq, auctionUpdatePatchReq.getProductList());
        // 4. 물건 내역 삭제
        List<Product> productList = productService.getProductListByAuctionSeq(auction.getSeq());
        historyService.deleteSalesHistory(productList);
        // 5. 물건 내역 등록
        historyService.registerSalesHistory(memberSeq, productList);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }

    @DeleteMapping("/{auctionHash}")
    public ResponseEntity<? extends BaseResponseBody> deleteAuction(@PathVariable String auctionHash, @ApiIgnore Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        Auction auction = auctionService.getAuctionByHash(auctionHash);
        if (LocalDateTime.parse(auction.getStartTime(), DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")).isBefore(LocalDateTime.now())) {
            throw new AuctionDeleteFailException("auction cannot be deleted after its startTime", ErrorCode.AUCTION_DELETE_FAIL);
        }
        Long auctionSeq = auction.getSeq();
        List<Product> productList = productService.getProductListByAuctionSeq(auctionSeq);
        historyService.deleteSalesHistory(productList);
        productService.deleteProductList(auctionSeq);
        auctionImageService.deleteAuctionImageList(auctionSeq);
        auctionService.deleteAuction(auctionSeq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }

    // 실시간 진행되고 있는 경매 목록 조회
    @GetMapping("/live")
    public ResponseEntity<List<AuctionListEntityRes>> getLiveAuctionList() {
        List<AuctionListEntityRes> auctionListEntityResList = new ArrayList<>();
        List<Auction> auctionList = auctionService.getLiveAuctionList();
        for (Auction auction : auctionList) {
            Long memberSeq = auction.getMemberSeq();
            Member member = memberService.getMemberByMemberSeq(memberSeq);
            List<AuctionImage> auctionImageList = auctionImageService.getAuctionImageListByAuctionSeq(auction.getSeq());
            auctionListEntityResList.add(AuctionListEntityRes.of(auction, member, auctionImageList));
        }
        return ResponseEntity.status(200).body(auctionListEntityResList);
    }

    // 경매 목록 검색
    @GetMapping("/search")
    public ResponseEntity<AuctionListRes> getAuctionList(@RequestParam(value = "word", required = false) String word, @RequestParam("page") int page, @RequestParam("size") int size, @RequestParam("sort") String sort) {
        // [key] 경매임박순: startTime, 최신등록순: seq, 인기순: interest, 판매자신뢰도순: score
        List<AuctionListEntityRes> auctionListEntityResList = new ArrayList<>();
        Boolean hasMore = false;
        List<Auction> auctionList = null;
        List<Auction> hasMoreList = null;
        if ("main".equals(sort)) {
            Pageable pageable = PageRequest.of(page, size);
            auctionList = auctionService.getAuctionListToday(pageable);
            hasMoreList = auctionService.getAuctionListToday(PageRequest.of(page + 1, size));
        } else if ("score".equals(sort)) { //판매자 신뢰도순
            Pageable pageable = PageRequest.of(page, size);
            auctionList = auctionService.getAuctionListOrderByScore(word, pageable);
            hasMoreList = auctionService.getAuctionListOrderByScore(word, PageRequest.of(page + 1, size));
        } else if ("startTime".equals(sort)) { // 경매임박순
            Pageable sortPageable = PageRequest.of(page, size, Sort.by(sort).ascending());
            auctionList = auctionService.getAuctionList(word, sortPageable);
            hasMoreList = auctionService.getAuctionList(word, PageRequest.of(page + 1, size, Sort.by(sort).ascending()));
        } else { // 최신등록순, 인기순
            Pageable sortPageable = PageRequest.of(page, size, Sort.by(sort).descending());
            auctionList = auctionService.getAuctionList(word, sortPageable);
            hasMoreList = auctionService.getAuctionList(word, PageRequest.of(page + 1, size, Sort.by(sort).descending()));
        }
        if (hasMoreList.size() != 0) hasMore = true;
        for (Auction auction : auctionList) {
            Long memberSeq = auction.getMemberSeq();
            Member member = memberService.getMemberByMemberSeq(memberSeq);
            List<AuctionImage> auctionImageList = auctionImageService.getAuctionImageListByAuctionSeq(auction.getSeq());
            auctionListEntityResList.add(AuctionListEntityRes.of(auction, member, auctionImageList));
        }
        return ResponseEntity.status(200).body(AuctionListRes.of(auctionListEntityResList, false, 0L, hasMore));
    }

    // 경매 카테고리별 목록 조회
    @GetMapping("/category")
    public ResponseEntity<AuctionListRes> getAuctionListByCategory(@RequestParam("category-seq") Long categorySeq, @RequestParam("page") int page, @RequestParam("size") int size, @RequestParam("sort") String sort) {
        // [key] 경매임박순: startTime, 최신등록순: seq, 인기순: interest, 판매자신뢰도순: score
        List<AuctionListEntityRes> auctionListEntityResList = new ArrayList<>();
        Boolean hasMore = false;
        List<Auction> auctionList = null;
        List<Auction> hasMoreList = null;
        if ("score".equals(sort)) { //판매자 신뢰도순
            Pageable pageable = PageRequest.of(page, size);
            auctionList = auctionService.getAuctionListByCategorySeqOrderByScore(categorySeq, pageable);
            hasMoreList = auctionService.getAuctionListByCategorySeqOrderByScore(categorySeq, PageRequest.of(page + 1, size));
        } else if ("startTime".equals(sort)) { // 경매임박순
            Pageable sortPageable = PageRequest.of(page, size, Sort.by(sort).ascending());
            auctionList = auctionService.getAuctionListByCategorySeq(categorySeq, sortPageable);
            hasMoreList = auctionService.getAuctionListByCategorySeq(categorySeq, PageRequest.of(page + 1, size, Sort.by(sort).ascending()));
        } else { // 최신등록순, 인기순
            Pageable sortPageable = PageRequest.of(page, size, Sort.by(sort).descending());
            auctionList = auctionService.getAuctionListByCategorySeq(categorySeq, sortPageable);
            hasMoreList = auctionService.getAuctionListByCategorySeq(categorySeq, PageRequest.of(page + 1, size, Sort.by(sort).descending()));
        }
        if (hasMoreList.size() != 0) hasMore = true;
        for (Auction auction : auctionList) {
            Long memberSeq = auction.getMemberSeq();
            Member member = memberService.getMemberByMemberSeq(memberSeq);
            List<AuctionImage> auctionImageList = auctionImageService.getAuctionImageListByAuctionSeq(auction.getSeq());
            auctionListEntityResList.add(AuctionListEntityRes.of(auction, member, auctionImageList));
        }
        return ResponseEntity.status(200).body(AuctionListRes.of(auctionListEntityResList, false, 0L, hasMore));
    }

    // 메인 - 관심 카테고리 (로그인, 비로그인 구분)
    @GetMapping("/main")
    public ResponseEntity<AuctionListRes> getMainAuctionList(@RequestParam("page") int page, @RequestParam("size") int size, @ApiIgnore @Nullable Authentication authentication) {
        List<AuctionListEntityRes> auctionListEntityResList = new ArrayList<>();
        Boolean hasMore = false;
        Boolean isInterest = false;
        Long categorySeq = 0L;
        List<Auction> auctionList = null;
        List<Auction> hasMoreList = null;
        Random rand = new Random();
        Pageable pageable = PageRequest.of(page, size);
        if (authentication != null) { // 로그인 유저
            MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
            Long loginMemberSeq = memberDetails.getMemberSeq();
            List<Long> interestCategoryList = interestCategoryService.getInterestCategoryListByMemberSeq(loginMemberSeq);
            if (interestCategoryList.size() != 0) { // 관심 카테고리 목록 존재
                isInterest = true;
                int randomIdx = rand.nextInt(interestCategoryList.size());
                categorySeq = interestCategoryList.get(randomIdx);
                auctionList = auctionService.getAuctionListByCategorySeq(categorySeq, pageable);
                hasMoreList = auctionService.getAuctionListByCategorySeq(categorySeq, PageRequest.of(page + 1, size));
            }
        }
        if (auctionList == null) { // 비로그인 유저 & 로그인 유저지만 관심 카테고리 없음
            Long randomIdx = 1 + (long) (Math.random() * 14);
            categorySeq = randomIdx;
            auctionList = auctionService.getAuctionListByCategorySeq(categorySeq, pageable);
            hasMoreList = auctionService.getAuctionListByCategorySeq(categorySeq, PageRequest.of(page + 1, size));
        }
        if (hasMoreList.size() != 0) hasMore = true;
        for (Auction auction : auctionList) {
            Long memberSeq = auction.getMemberSeq();
            Member member = memberService.getMemberByMemberSeq(memberSeq);
            List<AuctionImage> auctionImageList = auctionImageService.getAuctionImageListByAuctionSeq(auction.getSeq());
            auctionListEntityResList.add(AuctionListEntityRes.of(auction, member, auctionImageList));
        }
        return ResponseEntity.status(200).body(AuctionListRes.of(auctionListEntityResList, isInterest, categorySeq, hasMore));
    }

    @GetMapping("/standby/{hash}")
    public ResponseEntity<AuctionStandByRes> getAuctionStandBy(@PathVariable("hash") String hash) {
        Auction auction = auctionService.getAuctionByHash(hash);
        Member member = memberService.getMemberByMemberSeq(auction.getMemberSeq());
        return ResponseEntity.status(200).body(AuctionStandByRes.of(auction, member));
    }

    @GetMapping("/date")
    public ResponseEntity<?> getServerTime() {
        String date = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        return ResponseEntity.status(200).body(date);
    }
}