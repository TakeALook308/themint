package com.takealook.api.response;

import com.takealook.db.entity.Member;
import com.takealook.db.entity.Review;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ReviewListEntityRes {
    String writerNickname;
    String writerProfileUrl;
    String content;
    int score;
    String date;

    public static ReviewListEntityRes of(Member member, Review review){
        ReviewListEntityRes res = ReviewListEntityRes.builder()
                .writerNickname(member.getNickname())
                .writerProfileUrl(member.getProfileUrl())
                .content(review.getContent())
                .score(review.getScore())
                .date(review.getDate())
                .build();
        return res;
    }
}
