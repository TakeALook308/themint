package com.takealook.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 *  경매 생성 API ([POST] /api/auction) 요청에 필요한 리퀘스트 바디
 */
@Getter
@Setter
public class ProductRegisterPostReq {
    @ApiModelProperty(name = "물품 이름", example = "반팔티")
    String productName;
    @ApiModelProperty(name = "경매 시작가", example = "5000")
    int startPrice;
}
