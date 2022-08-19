package com.takealook.api.request;

import io.swagger.annotations.ApiModel;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel("MemberDeleteRequest")
public class MemberDeleteReq {
    String memberId;
    String pwd;
}
