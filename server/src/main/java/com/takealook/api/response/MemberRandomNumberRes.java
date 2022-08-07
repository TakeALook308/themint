package com.takealook.api.response;

import com.takealook.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberRandomNumberRes extends BaseResponseBody {
    int randNum;

    public static MemberRandomNumberRes of (Integer statusCode, String message, int randNum) {
        MemberRandomNumberRes res = new MemberRandomNumberRes();
        res.setStatusCode(statusCode);
        res.setMessage(message);
        res.setRandNum(randNum);
        return res;
    }
}
