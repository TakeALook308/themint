package com.takealook.api.service;

import com.takealook.db.entity.InterestKeyword;

import java.util.List;

public interface InterestKeywordService {
    void createInterestKeyword(Long memberSeq, String keywordName);
    List<String> getInterestKeywordListByMemberSeq(Long memberSeq);
    void deleteKeyword(Long memberSeq, String keywordName);
}