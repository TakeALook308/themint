package com.takealook.db.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@DynamicUpdate // 변경된 컬럼만 업데이트(patch)
public class Member{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long seq;
    String memberId;
    String memberName;
    String nickname;
    String email;
    String address;
    String addressDetail;
    String phone;
    String profileUrl;
    int bankCode;
    String accountNo;
    int score;
    int noticeKakao;
    int noticeEmail;

    @JsonIgnore
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String pwd;
}
