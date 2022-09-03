package com.takealook.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewRegisterPostReq {
    Long receiverSeq;
    Long productSeq;
    String content;
    int score;
}
