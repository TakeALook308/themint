package com.takealook.db.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDelivery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long seq;
    Long productSeq;
    String name;
    String phone;
    String address;
    String addressDetail;
    String zipCode;
    String remitName;
    String parcelCompanyCode;
    String trackingNo;
}
