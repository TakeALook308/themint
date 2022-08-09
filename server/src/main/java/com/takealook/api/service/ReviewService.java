package com.takealook.api.service;

import com.takealook.api.request.ReviewRegisterPostReq;

public interface ReviewService {
    int registerReview(Long writerSeq, ReviewRegisterPostReq reviewRegisterPostReq);
}
