package com.takealook.api.service;

import com.takealook.db.entity.MemberKeyword;

import java.util.List;

public interface MemberKeywordService {
    MemberKeyword createMemberKeyword(Long memberSeq, String keywordName);
    List<MemberKeyword> getMemberKeywordListByMemberSeq(Long memberSeq);
    void deleteKeyword(Long memberSeq, String keywordName);
}