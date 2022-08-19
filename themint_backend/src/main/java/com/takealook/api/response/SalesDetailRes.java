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
public class SalesDetailRes {
    // historySeq, status, 구매자 memberSeq, 구매자 profileUrl, 구매자 nickname, 입금자명, 배송지정보, 송장번호
    String hash;
    Long historySeq;
    Long productSeq;
    Long memberSeq;
    int status;
    String profileUrl;
    String nickname;
    String remitName;
    String name;
    String phone;
    String address;
    String addressDetail;
    String zipCode;
    String trackingNo;

    public static SalesDetailRes of(String hash, History history, Product product, Member member, ProductDelivery productDelivery){
        SalesDetailRes res = SalesDetailRes.builder()
                .hash(hash)
                .historySeq(history.getSeq())
                .productSeq(product.getSeq())
                .memberSeq(member.getSeq())
                .status(product.getStatus())
                .profileUrl(member.getProfileUrl())
                .nickname(member.getNickname())
                .remitName(productDelivery.getRemitName())
                .name(productDelivery.getName())
                .phone(productDelivery.getPhone())
                .address(productDelivery.getAddress())
                .addressDetail(productDelivery.getAddressDetail())
                .zipCode(productDelivery.getZipCode())
                .trackingNo(productDelivery.getTrackingNo())
                .build();
        return res;
    }
}
