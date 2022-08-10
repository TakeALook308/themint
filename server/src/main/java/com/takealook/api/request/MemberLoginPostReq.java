package com.takealook.api.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberLoginPostReq {
    @ApiModelProperty(name = "멤버 ID", example = "themint")
    String memberId;
    @ApiModelProperty(name = "멤버 Password", example = "your_password")
    String pwd;
}
