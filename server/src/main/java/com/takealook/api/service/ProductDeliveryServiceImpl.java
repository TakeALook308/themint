package com.takealook.api.service;

import com.takealook.db.entity.ProductDelivery;
import com.takealook.db.repository.ProductDeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductDeliveryServiceImpl implements ProductDeliveryService{

    @Autowired
    ProductDeliveryRepository productDeliveryRepository;

    @Override
    public ProductDelivery getProductDeliveryByProductSeq(Long productSeq) {
        ProductDelivery productDelivery = productDeliveryRepository.findByProductSeq(productSeq);
        return productDelivery;
    }
}
