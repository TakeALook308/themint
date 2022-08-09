package com.takealook.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * 멤버 관심 키워드 생성 API ([POST] /api/keyword/{keyword_name}) 요청에 필요한 리퀘스트 바디
 */
@Getter
@Setter
@ApiModel("MemberKeywordRegisterPostRequest")
public class InterestKeywordRegisterPostReq {
    @ApiModelProperty(name="멤버 seq", example = "1234")
    int memberSeq;
    @ApiModelProperty(name="관심 키워드 이름", example = "삼성 모니터")
    String keywordName;
}