package com.takealook.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

// 경매 중 가격 객체
@Getter
@Builder
@ToString
public class ProductPrice {
    String roomId;
    Long productSeq;
    int price;
}
