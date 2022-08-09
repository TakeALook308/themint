package com.takealook.api.service;

import com.takealook.api.request.ReviewRegisterPostReq;
import com.takealook.db.entity.Review;

import java.util.List;

public interface ReviewService {
    int registerReview(Long writerSeq, ReviewRegisterPostReq reviewRegisterPostReq);
    List<Review> getReviewList(Long memberSeq);
}
