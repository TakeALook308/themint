package com.takealook.api.response;

import com.takealook.common.model.response.BaseResponseBody;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberFindMemberIdRes {
    String memberId;

    public static MemberFindMemberIdRes of (String memberId){
       MemberFindMemberIdRes res = new MemberFindMemberIdRes();
       res.setMemberId(memberId);
       return res;
    }
}
