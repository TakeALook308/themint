package com.takealook.api.response;

import com.takealook.db.entity.History;
import com.takealook.db.entity.Member;
import com.takealook.db.entity.Product;
import com.takealook.db.entity.ProductDelivery;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class PurchaseDetailRes {
    // 계좌, 입금자명, 배송정보,
    Long historySeq;
    Long productSeq;
    int bankCode;
    String accountNo;
    int status;
    String remitName;
    String name;
    String phone;
    String address;
    String addressDetail;
    String trackingNo;

    public static PurchaseDetailRes of(History history, Product product, ProductDelivery productDelivery, Member member){
        PurchaseDetailRes res = PurchaseDetailRes.builder()
                .historySeq(history.getSeq())
                .productSeq(history.getProductSeq())
                .bankCode(member.getBankCode())
                .accountNo(member.getAccountNo())
                .status(product.getStatus())
                .remitName(productDelivery.getRemitName())
                .name(productDelivery.getName())
                .phone(productDelivery.getPhone())
                .address(productDelivery.getAddress())
                .addressDetail(productDelivery.getAddressDetail())
                .trackingNo(productDelivery.getTrackingNo())
                .build();
        return res;
    }
}
