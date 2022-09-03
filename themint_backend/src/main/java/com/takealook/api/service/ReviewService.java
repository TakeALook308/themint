package com.takealook.api.service;

import com.takealook.api.request.ReviewRegisterPostReq;
import com.takealook.db.entity.Review;

import java.util.List;

public interface ReviewService {
    void registerReview(Long writerSeq, ReviewRegisterPostReq reviewRegisterPostReq);
    Review getReview(Long memberseq, Long productSeq);
    List<Review> getReviewList(Long memberSeq);
}
