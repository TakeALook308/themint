package com.takealook.api.controller;

import com.takealook.api.request.ProductDeliveryUpdatePatchReq;
import com.takealook.api.request.TrackingNoRegisterPostReq;
import com.takealook.api.service.ProductDeliveryService;
import com.takealook.api.service.ProductService;
import com.takealook.common.model.response.BaseResponseBody;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "배송 관리 API", tags = {"Delivery"})
@RestController
@RequestMapping("/delivery")
public class DeliveryController {

    @Autowired
    ProductDeliveryService productDeliveryService;

    @Autowired
    ProductService productService;

    @PatchMapping("/trackingno")
    public ResponseEntity<? extends BaseResponseBody> updateTrackingno(@RequestBody TrackingNoRegisterPostReq trackingnoRegisterPostReq, @ApiIgnore Authentication authentication){
        int result = productDeliveryService.updateTrackingno(trackingnoRegisterPostReq);
        productService.updateStatus(trackingnoRegisterPostReq.getProductSeq(), 3);
        if(result == 1) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
        } else{
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "운송장번호 등록에 실패하였습니다."));
        }
    }

    @PatchMapping
    public ResponseEntity<? extends BaseResponseBody> updateProductDelivery(@RequestBody ProductDeliveryUpdatePatchReq productDeliveryUpdatePatchReq){
        int result = productDeliveryService.updateProductDelivery(productDeliveryUpdatePatchReq);
        if(result == 1) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
        } else{
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "배송정보 입력에 실패하였습니다."));
        }
    }
}