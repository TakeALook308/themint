package com.takealook.api.service;

import com.takealook.api.request.ReviewRegisterPostReq;
import com.takealook.db.entity.Review;
import com.takealook.db.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    ReviewRepository reviewRepository;

    @Override
    public void registerReview(Long writerSeq, ReviewRegisterPostReq reviewRegisterPostReq) {
        reviewRepository.save(Review.builder()
                .receiverSeq(reviewRegisterPostReq.getReceiverSeq())
                .writerSeq(writerSeq)
                .productSeq(reviewRegisterPostReq.getProductSeq())
                .content(reviewRegisterPostReq.getContent())
                .score(reviewRegisterPostReq.getScore())
                .date(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                .build());
    }

    @Override
    public Review getReview(Long memberseq, Long productSeq) {
        Review review = reviewRepository.findByReceiverSeqAndProductSeq(memberseq, productSeq);
        return review;
    }

    @Override
    public List<Review> getReviewList(Long memberSeq) {
        List<Review> reviewList = reviewRepository.findAllByReceiverSeqOrderByDateDesc(memberSeq);
        return reviewList;
    }
}
