package com.takealook.api.service;

import com.takealook.api.request.ProductDeliveryUpdatePatchReq;
import com.takealook.api.request.TrackingNoRegisterPostReq;
import com.takealook.db.entity.Member;
import com.takealook.db.entity.ProductDelivery;

public interface ProductDeliveryService {
    ProductDelivery getProductDeliveryByProductSeq(Long productSeq);
    void setMemberInfo(Member member, Long productSeq);
    int updateTrackingno(TrackingNoRegisterPostReq trackingnoRegisterPostReq);
    int updateProductDelivery(ProductDeliveryUpdatePatchReq productDeliveryUpdatePatchReq);
}
