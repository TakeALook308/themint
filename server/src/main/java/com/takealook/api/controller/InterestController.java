package com.takealook.api.controller;

import com.takealook.api.response.InterestAuctionRes;
import com.takealook.api.response.InterestCategoryRes;
import com.takealook.api.response.InterestKeywordRes;
import com.takealook.api.service.InterestAuctionService;
import com.takealook.api.service.InterestCategoryService;
import com.takealook.api.service.InterestKeywordService;
import com.takealook.common.auth.MemberDetails;
import com.takealook.common.model.response.BaseResponseBody;
import com.takealook.db.entity.InterestAuction;
import com.takealook.db.entity.InterestCategory;
import com.takealook.db.entity.InterestKeyword;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

/**
 * 관심 키워드/카테고리/경매 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "관심 키워드/카테고리/경매 API", tags = {"Interest"})
@RestController
@RequestMapping("/interest")
public class InterestController {

    @Autowired
    InterestKeywordService interestKeywordService;

    @Autowired
    InterestCategoryService interestCategoryService;

    @Autowired
    InterestAuctionService interestAuctionService;

    /*
        관심 키워드 생성, 조회, 삭제
     */
    @PostMapping("/keyword/{keywordName}")
    @ApiOperation(value = "관심 키워드 등록", notes = "<strong>관심 키워드 정보</strong>를 등록한다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<? extends BaseResponseBody> registerKeyword(@PathVariable String keywordName, @ApiIgnore Authentication authentication){
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        InterestKeyword interestKeyword = interestKeywordService.createInterestKeyword(memberSeq, keywordName);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping("/keyword")
    @ApiOperation(value = "멤버의 관심 키워드 조회", notes = "로그인한 회원의 관심 키워드 목록을 응답한다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<InterestKeywordRes> getInterestKeywordList(@ApiIgnore Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        List<InterestKeyword> interestKeywordList = interestKeywordService.getInterestKeywordListByMemberSeq(memberSeq);
        return ResponseEntity.status(200).body(InterestKeywordRes.of(interestKeywordList));
    }

    @DeleteMapping("/keyword/{keywordName}")
    @ApiOperation(value = "관심 키워드 삭제", notes = "관심 키워드를 삭제한다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<? extends BaseResponseBody> deleteKeyword(@PathVariable String keywordName, @ApiIgnore Authentication authentication){
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        interestKeywordService.deleteKeyword(memberSeq, keywordName);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    /*
        관심 카테고리 생성, 조회, 삭제
     */
    @PostMapping("/category/{categorySeq}")
    @ApiOperation(value = "관심 카테고리 등록", notes = "<strong>관심 카테고리 정보</strong>를 등록한다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<? extends BaseResponseBody> registerCategory(@PathVariable Long categorySeq, @ApiIgnore Authentication authentication){
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        InterestCategory interestCategory = interestCategoryService.createInterestCategory(memberSeq, categorySeq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping("/category")
    @ApiOperation(value = "멤버의 관심 카테고리 조회", notes = "로그인한 회원의 관심 카테고리 목록을 응답한다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<InterestCategoryRes> getInterestCategoryList(@ApiIgnore Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        List<InterestCategory> interestCategoryList = interestCategoryService.getInterestCategoryListByMemberSeq(memberSeq);
        return ResponseEntity.status(200).body(InterestCategoryRes.of(interestCategoryList));
    }

    @DeleteMapping("/category/{categorySeq}")
    @ApiOperation(value = "관심 카테고리 삭제", notes = "관심 카테고리를 삭제한다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<? extends BaseResponseBody> deleteCategory(@PathVariable Long categorySeq, @ApiIgnore Authentication authentication){
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        int result = interestCategoryService.deleteCategory(memberSeq, categorySeq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    /*
        관심 경매 생성, 조회, 삭제
     */
    @PostMapping("/auction/{auctionSeq}")
    @ApiOperation(value = "관심 경매 등록", notes = "<strong>관심 경매 정보</strong>를 등록한다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<? extends BaseResponseBody> registerAuction(@PathVariable Long auctionSeq, @ApiIgnore Authentication authentication){
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        int result = interestAuctionService.createInterestAuction(memberSeq, auctionSeq);
        if(result == 1){
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
        } else{ // auctionSeq에 해당하는 경매 없음
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "Fail"));
        }

    }

//    @GetMapping("/auction")
//    @ApiOperation(value = "멤버의 관심 경매 조회", notes = "로그인한 회원의 관심 경매 목록을 응답한다.")
//    @ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
//            @ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
//    public ResponseEntity<InterestAuctionRes> getInterestAuctionList(@ApiIgnore Authentication authentication) {
//        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
//        Long memberSeq = memberDetails.getMemberSeq();
//        List<InterestAuction> interestAuctionList = interestAuctionService.getInterestAuctionListByMemberSeq(memberSeq);
//        return ResponseEntity.status(200).body(InterestAuctionRes.of(interestAuctionList));
//    }
//
//    @DeleteMapping("/auction/{auctionSeq}")
//    @ApiOperation(value = "관심 경매 삭제", notes = "관심 경매를 삭제한다.")
//    @ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
//            @ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
//    public ResponseEntity<? extends BaseResponseBody> deleteAuction(@PathVariable Long auctionSeq, @ApiIgnore Authentication authentication){
//        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
//        Long memberSeq = memberDetails.getMemberSeq();
//        int result = interestAuctionService.deleteAuction(memberSeq, auctionSeq);
//        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
//    }
}
