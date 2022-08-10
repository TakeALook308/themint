package com.takealook.api.request;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 *  경매 생성 API ([POST] /api/auction) 요청에 필요한 리퀘스트 바디
 */
@Getter
@Setter
public class AuctionImageRegisterPostReq {
    @ApiModelProperty(name = "경매 이미지 url", example = "")
    String imageUrl;
}
