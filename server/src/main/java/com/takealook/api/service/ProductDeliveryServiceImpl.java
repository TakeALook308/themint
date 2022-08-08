package com.takealook.api.service;

import com.takealook.api.request.TrackingnoRegisterPostReq;
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

    @Override
    public int updateTrackingno(TrackingnoRegisterPostReq trackingnoRegisterPostReq) {
        ProductDelivery productDelivery = productDeliveryRepository.findByProductSeq(trackingnoRegisterPostReq.getProductSeq());
        if(productDelivery != null) {
            productDeliveryRepository.save(ProductDelivery.builder()
                    .seq(productDelivery.getSeq())
                    .productSeq(productDelivery.getProductSeq())
                    .name(productDelivery.getName())
                    .phone(productDelivery.getPhone())
                    .address(productDelivery.getAddress())
                    .remitName(productDelivery.getRemitName())
                    .parcelCompanyCode(trackingnoRegisterPostReq.getParcelCompanyCode())
                    .trackingNo(trackingnoRegisterPostReq.getTrackingno())
                    .build()
            );
            return 1;
        }
        return 0;
    }
}
