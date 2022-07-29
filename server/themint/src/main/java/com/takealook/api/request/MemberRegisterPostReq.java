package com.takealook.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * 멤버 회원가입 API ([POST] /api/member) 요청에 필요한 리퀘스트 바디
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel("MemberRegisterPostRequest")
public class MemberRegisterPostReq {
    @ApiModelProperty(name = "멤버 ID", example = "themint")
    String memberId;
    @ApiModelProperty(name = "멤버 Password", example = "your_password")
    String pwd;
    @ApiModelProperty(name = "멤버 Name", example = "정민호")
    String memberName;
    @ApiModelProperty(name = "멤버 nickname", example = "minogood")
    String nickname;

    @ApiModelProperty(name = "멤버 email", example = "mino@ssafy.com")
    String email;

    @ApiModelProperty(name = "멤버 address", example = "해양1로 30, 101동 101호")
    String address;

    @ApiModelProperty(name = "멤버 phone", example = "01012345678")
    String phone;

    @ApiModelProperty(name = "kakao 알림 Y/N", example = "1")
    int noticeKakao;

    @ApiModelProperty(name = "email 알림 Y/N", example = "0")
    int noticeEmail;
}
