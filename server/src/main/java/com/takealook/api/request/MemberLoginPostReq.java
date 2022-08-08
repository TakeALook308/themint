package com.takealook.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberLoginPostReq {
    String memberId;
    String pwd;
}
