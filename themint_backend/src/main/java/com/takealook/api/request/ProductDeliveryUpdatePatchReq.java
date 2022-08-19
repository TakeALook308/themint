package com.takealook.api.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 *  배송 정보 수정 API ([PATCH] /api/delivery) 요청에 필요한 리퀘스트 바디
 */
@Getter
@Setter
public class ProductDeliveryUpdatePatchReq {
    Long productDeliverySeq;
    String remitName;
    String name;
    String phone;
    String address;
    String addressDetail;
    String zipCode;
}
