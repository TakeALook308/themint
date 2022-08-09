package com.takealook.api.controller;

import com.takealook.api.request.ReviewRegisterPostReq;
import com.takealook.api.service.ReviewService;
import com.takealook.common.auth.MemberDetails;
import com.takealook.common.model.response.BaseResponseBody;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "리뷰 API", tags = {"Review"})
@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @PostMapping
    public ResponseEntity<? extends BaseResponseBody> registerReview(@RequestBody ReviewRegisterPostReq reviewRegisterPostReq, @ApiIgnore Authentication authentication){
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long writerSeq = memberDetails.getMemberSeq();
        int result = reviewService.registerReview(writerSeq, reviewRegisterPostReq);
        if(result == 1) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
        }
        return ResponseEntity.status(409).body(BaseResponseBody.of(409, "fail"));
    }
}
