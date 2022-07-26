package com.takealook.api.controller;

import com.takealook.api.response.MemberKeywordRes;
import com.takealook.api.service.MemberKeywordService;
import com.takealook.common.auth.MemberDetails;
import com.takealook.common.model.response.BaseResponseBody;
import com.takealook.db.entity.MemberKeyword;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.List;

/**
 * 관심 키워드 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "관심 키워드 API", tags = {"Keyword"})
@RestController
@RequestMapping("/api/keyword")
public class MemberKeywordController {

    @Autowired
    MemberKeywordService memberKeywordService;

    @PostMapping("/{keywordName}")
    @ApiOperation(value = "관심 키워드 등록", notes = "<strong>관심 키워드 정보</strong>를 등록한다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<? extends BaseResponseBody> register(@PathVariable String keywordName, @ApiIgnore Authentication authentication){

        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        MemberKeyword memberKeyword = memberKeywordService.createMemberKeyword(memberSeq, keywordName);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }

    @GetMapping
    @ApiOperation(value = "멤버의 관심 키워드 조회", notes = "로그인한 회원의 관심 키워드 목록을 응답한다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<MemberKeywordRes> getMemberKeywordList(@ApiIgnore Authentication authentication) {

        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        List<MemberKeyword> memberKeywordList = memberKeywordService.getMemberKeywordListByMemberSeq(memberSeq);
        return ResponseEntity.status(200).body(MemberKeywordRes.of(memberKeywordList));
    }

    @DeleteMapping("/{keywordName}")
    @ApiOperation(value = "관심 키워드 삭제", notes = "관심 키워드를 삭제한다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<? extends BaseResponseBody> deleteKeyword(@PathVariable String keywordName, @ApiIgnore Authentication authentication){
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        memberKeywordService.deleteKeyword(memberSeq, keywordName);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }
}