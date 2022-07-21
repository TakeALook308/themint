package com.takealook.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;

@Entity
@Getter
@Setter
public class Member extends BaseEntity{
    String memberId;
    String memberName;
    String nickname;
    String email;
    String address;
    String phone;
    String profileUrl;
    int bankCode;
    String accountNo;
    int score;
    int mileage;
    int noticeKakao;
    int noticeEmail;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String pwd;
}
