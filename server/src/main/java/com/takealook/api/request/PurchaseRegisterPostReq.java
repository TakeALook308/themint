package com.takealook.api.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 *  구매 물품 생성 API ([POST] /api/history/purchase) 요청에 필요한 리퀘스트 바디
 */
@Getter
@Setter
@Builder
public class PurchaseRegisterPostReq {
    Long memberSeq;
    Long productSeq;
    int finalPrice;
}
