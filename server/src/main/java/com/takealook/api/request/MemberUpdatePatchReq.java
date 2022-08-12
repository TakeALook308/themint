package com.takealook.api.request;

import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel("MemberUpdatePostRequest")
public class MemberUpdatePatchReq {
    String nickname;
    String email;
    String address;
    String addressDetail;
    String zipCode;
    String phone;
    int bankCode;
    String accountNo;
    int noticeKakao;
    int noticeEmail;

}
