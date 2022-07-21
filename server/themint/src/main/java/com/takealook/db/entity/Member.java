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
    String member_id;
    String member_name;
    String nickname;
    String email;
    String address;
    String phone;
    String profile_url;
    int bank_code;
    String account_no;
    int score;
    int mileage;
    int notice_kakao;
    int notice_email;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String pwd;
}
