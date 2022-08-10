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
public class InterestKeyword {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long seq;
    Long memberSeq;
    String keywordName;
}