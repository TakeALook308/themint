package com.takealook.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class MemberRandomNumberRes {
    int randNum;

    public static MemberRandomNumberRes of (int randNum) {
        MemberRandomNumberRes res = new MemberRandomNumberRes();
        res.setRandNum(randNum);
        return res;
    }
}
