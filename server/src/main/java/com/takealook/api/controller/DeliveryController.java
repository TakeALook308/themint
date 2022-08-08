package com.takealook.api.controller;

import com.takealook.api.request.TrackingnoRegisterPostReq;
import com.takealook.api.service.ProductDeliveryService;
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

    @PatchMapping("/trackingno")
    public ResponseEntity<? extends BaseResponseBody> updateTrackingno(@RequestBody TrackingnoRegisterPostReq trackingnoRegisterPostReq, @ApiIgnore Authentication authentication){
        int result = productDeliveryService.updateTrackingno(trackingnoRegisterPostReq);
        if(result == 1) {
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
        } else{
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "fail"));
        }
    }

}