package com.takealook.api.request;

import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel("MemberUpdatePostRequest")
public class MemberUpdatePostReq {
    String nickname;
    String email;
    String address;
    String phone;
    String profileUrl;
    int bankCode;
    String accountNo;
    int noticeKakao;
    int noticeEmail;

}
