package com.takealook.api.service;

import com.takealook.api.request.ProductDeliveryUpdatePatchReq;
import com.takealook.api.request.TrackingNoRegisterPostReq;
import com.takealook.db.entity.Member;
import com.takealook.db.entity.ProductDelivery;
import com.takealook.db.repository.ProductDeliveryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductDeliveryServiceImpl implements ProductDeliveryService {

    @Autowired
    ProductDeliveryRepository productDeliveryRepository;

    @Override
    public ProductDelivery getProductDeliveryByProductSeq(Long productSeq) {
        ProductDelivery productDelivery = productDeliveryRepository.findByProductSeq(productSeq);
        return productDelivery;
    }

    @Override
    public void setMemberInfo(Member member, Long productSeq) {
        ProductDelivery productDelivery = ProductDelivery.builder()
                .productSeq(productSeq)
                .name(member.getMemberName())
                .phone(member.getPhone())
                .address(member.getAddress())
                .addressDetail(member.getAddressDetail())
                .remitName(member.getMemberName())
                .build();
        productDeliveryRepository.save(productDelivery);
    }

    @Override
    public int updateTrackingno(TrackingNoRegisterPostReq trackingNoRegisterPostReq) {
        ProductDelivery productDelivery = productDeliveryRepository.findByProductSeq(trackingNoRegisterPostReq.getProductSeq());
        if (productDelivery != null) {
            productDeliveryRepository.save(ProductDelivery.builder()
                    .seq(productDelivery.getSeq())
                    .productSeq(productDelivery.getProductSeq())
                    .name(productDelivery.getName())
                    .phone(productDelivery.getPhone())
                    .address(productDelivery.getAddress())
                    .addressDetail(productDelivery.getAddressDetail())
                    .remitName(productDelivery.getRemitName())
                    .parcelCompanyCode(trackingNoRegisterPostReq.getParcelCompanyCode())
                    .trackingNo(trackingNoRegisterPostReq.getTrackingNo())
                    .build()
            );
            return 1;
        }
        return 0;
    }

    @Override
    public int updateProductDelivery(ProductDeliveryUpdatePatchReq productDeliveryUpdatePatchReq) {
        ProductDelivery productDelivery = productDeliveryRepository.findBySeq(productDeliveryUpdatePatchReq.getProductDeliverySeq());
        if (productDelivery != null) {
            productDeliveryRepository.save(ProductDelivery.builder()
                    .seq(productDelivery.getSeq())
                    .productSeq(productDelivery.getProductSeq())
                    .name(productDeliveryUpdatePatchReq.getName())
                    .phone(productDeliveryUpdatePatchReq.getPhone())
                    .address(productDeliveryUpdatePatchReq.getAddress())
                    .addressDetail(productDeliveryUpdatePatchReq.getAddressDetail())
                    .zipCode(productDeliveryUpdatePatchReq.getZipCode())
                    .remitName(productDeliveryUpdatePatchReq.getRemitName())
                    .parcelCompanyCode(productDelivery.getParcelCompanyCode())
                    .trackingNo(productDelivery.getTrackingNo())
                    .build()
            );
            return 1;
        }
        return 0;
    }
}
