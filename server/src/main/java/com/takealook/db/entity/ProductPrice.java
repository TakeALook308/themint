package com.takealook.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

// 경매 중 가격 객체
@Getter
@Setter
@Builder
@ToString
public class ProductPrice {
    String roomId;
    Long memberSeq;
    String nickname;
    Long productSeq;
    int price;
    int index;
    String date;
}
