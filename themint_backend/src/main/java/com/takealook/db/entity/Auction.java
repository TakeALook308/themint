package com.takealook.db.entity;

import lombok.*;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Auction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long seq;
    String hash;
    Long memberSeq;
    String title;
    String content;
    Long categorySeq;
    String startTime;
    int interest; // 사용자가 관심 경매로 등록하면 1씩 증가
    int status; // 0 : 시작 안된거 . 1 : 시작 된거
}
