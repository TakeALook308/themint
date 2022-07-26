package com.takealook.api.response;

import com.takealook.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberFindMemberIdRes extends BaseResponseBody {
    String memberId;

    public static MemberFindMemberIdRes of (Integer statusCode, String message, String memberId){
       MemberFindMemberIdRes res = new MemberFindMemberIdRes();
       res.setMemberId(memberId);
       res.setStatusCode(statusCode);
       res.setMessage(message);
       return res;
    }
}
