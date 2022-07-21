package com.takealook.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 멤버 회원가입 API ([POST] /api/member) 요청에 필요한 리퀘스트 바디
 */
@Getter
@Setter
@ApiModel("MemberRegisterPostRequest")
public class MemberRegisterPostReq {
    @ApiModelProperty(name="멤버 ID", example = "themint")
    String id;
    @ApiModelProperty(name="멤버 Password", example = "your_password")
    String password;
}
