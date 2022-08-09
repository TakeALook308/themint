package com.takealook.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewRegisterPostReq {
    Long receiverSeq;
    String content;
    int score;
}
