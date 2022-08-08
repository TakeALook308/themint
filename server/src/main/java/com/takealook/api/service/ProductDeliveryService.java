package com.takealook.api.service;

import com.takealook.db.entity.ProductDelivery;

public interface ProductDeliveryService {
    ProductDelivery getProductDeliveryByProductSeq(Long productSeq);
}
