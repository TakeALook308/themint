package com.takealook.api.controller;

import com.takealook.api.request.MemberKeywordRegisterPostReq;
import com.takealook.api.service.MemberKeywordService;
import com.takealook.common.model.response.BaseResponseBody;
import com.takealook.db.entity.MemberKeyword;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 관심 키워드 관련 API 요청 처리를 위한 컨트롤러 정의.
 */
@Api(value = "관심 키워드 API", tags = {"Keyword"})
@RestController
@RequestMapping("/api/keyword")
public class MemberKeywordController {

    @Autowired
    MemberKeywordService memberKeywordService;

    @PostMapping
    @ApiOperation(value = "관심 키워드 등록", notes = "<strong>관심 키워드 정보</strong>를 등록한다.")
    @ApiResponses({ @ApiResponse(code = 200, message = "성공"), @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"), @ApiResponse(code = 500, message = "서버 오류") })
    public ResponseEntity<? extends BaseResponseBody> register(@RequestBody @ApiParam(value = "관심 키워드 정보", required = true) MemberKeywordRegisterPostReq registerInfo){
        MemberKeyword memberKeyword = memberKeywordService.createMemberKeyword(registerInfo);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "Success"));
    }



}
