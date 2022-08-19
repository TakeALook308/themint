package com.takealook.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberScoreUpdatePatchReq {
    Long seq;
    int score;
}
