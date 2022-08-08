package com.takealook.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberSetNewPwdCheckPostReq {
    String memberId;
    String email;
}
