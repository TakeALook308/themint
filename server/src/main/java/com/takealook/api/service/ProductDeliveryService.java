package com.takealook.api.service;

import com.takealook.api.request.TrackingnoRegisterPostReq;
import com.takealook.db.entity.ProductDelivery;

public interface ProductDeliveryService {
    ProductDelivery getProductDeliveryByProductSeq(Long productSeq);
    int updateTrackingno(TrackingnoRegisterPostReq trackingnoRegisterPostReq);
}
