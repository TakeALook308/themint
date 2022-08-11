package com.takealook.api.controller;

import com.takealook.api.request.ReviewRegisterPostReq;
import com.takealook.api.response.ReviewListEntityRes;
import com.takealook.api.service.MemberService;
import com.takealook.api.service.ReviewService;
import com.takealook.common.auth.MemberDetails;
import com.takealook.common.model.response.BaseResponseBody;
import com.takealook.db.entity.Member;
import com.takealook.db.entity.Review;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;

@Api(value = "리뷰 API", tags = {"Review"})
@RestController
@RequestMapping("/review")
public class ReviewController {

    @Autowired
    ReviewService reviewService;

    @Autowired
    MemberService memberService;

    @GetMapping("/{memberSeq}")
    public ResponseEntity<List<ReviewListEntityRes>> getReviewList(@PathVariable("memberSeq") Long memberSeq) {
        List<Review> reviewList = reviewService.getReviewList(memberSeq);
        List<ReviewListEntityRes> reviewListEntityResList = new ArrayList<>();
        for (Review review : reviewList) {
            Member writer = memberService.getMemberByMemberSeq(review.getWriterSeq());
            reviewListEntityResList.add(ReviewListEntityRes.of(writer, review));
        }
        return ResponseEntity.status(200).body(reviewListEntityResList);
    }

    @PostMapping
    public ResponseEntity<? extends BaseResponseBody> registerReview(@RequestBody ReviewRegisterPostReq reviewRegisterPostReq, @ApiIgnore Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long writerSeq = memberDetails.getMemberSeq();
        int score = reviewRegisterPostReq.getScore();
        if(score < 3) {
            memberService.updateMemberScore(reviewRegisterPostReq.getReceiverSeq(), -score);
        } else if(score > 3){
            memberService.updateMemberScore(reviewRegisterPostReq.getReceiverSeq(), score);
        }
        reviewService.registerReview(writerSeq, reviewRegisterPostReq);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }
}
