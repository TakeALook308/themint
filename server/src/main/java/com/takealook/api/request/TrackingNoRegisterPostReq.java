package com.takealook.api.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 *  운송장번호 등록 API ([PATCH] /api/delivery/trackingno) 요청에 필요한 리퀘스트 바디
 */
@Getter
@Setter
public class TrackingNoRegisterPostReq {
    Long productSeq;
    String parcelCompanyCode;
    String trackingNo;
}
