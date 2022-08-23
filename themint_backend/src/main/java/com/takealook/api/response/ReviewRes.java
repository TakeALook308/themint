package com.takealook.api.response;

import com.takealook.db.entity.Member;
import com.takealook.db.entity.Review;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ReviewRes {
    String content;
    int score;
    String date;

    public static ReviewRes of(Review review){
        ReviewRes res = ReviewRes.builder()
                .content(review.getContent())
                .score(review.getScore())
                .date(review.getDate())
                .build();
        return res;
    }
}
