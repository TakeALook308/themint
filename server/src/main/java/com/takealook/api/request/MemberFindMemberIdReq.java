package com.takealook.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberFindMemberIdReq {
    String memberName;
    String phone;
}
