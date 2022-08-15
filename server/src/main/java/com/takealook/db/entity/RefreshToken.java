package com.takealook.db.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RefreshToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long seq;
    String refreshToken;

    @ManyToOne
    @JoinColumn(name = "member_seq")
    private Member member;

//    @Builder
//    public RefreshToken(String refreshToken, Member member) {
//        this.refreshToken = refreshToken;
//        this.member = member;
//    }
//
//    public void refreshUpdate(String refreshToken) {
//        this.refreshToken = refreshToken;
//    }
}
