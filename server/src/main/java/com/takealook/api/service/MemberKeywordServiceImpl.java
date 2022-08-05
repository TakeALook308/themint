package com.takealook.api.service;

import com.takealook.db.entity.MemberKeyword;
import com.takealook.db.repository.MemberKeywordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberKeywordServiceImpl implements MemberKeywordService{
    @Autowired
    MemberKeywordRepository memberKeywordRepository;

    @Override
    public MemberKeyword createMemberKeyword(Long memberSeq, String keywordName) {
        MemberKeyword memberKeyword = MemberKeyword.builder()
                                .memberSeq(memberSeq)
                                .keywordName(keywordName)
                                .build();
        memberKeywordRepository.save(memberKeyword);
        return memberKeyword;
    }

    @Override
    public List<MemberKeyword> getMemberKeywordListByMemberSeq(Long memberSeq) {
        List<MemberKeyword> list = memberKeywordRepository.findAllByMemberSeq(memberSeq).orElse(null);
        return list;
    }

    @Override
    public void deleteKeyword(Long memberSeq, String keywordName) {
        MemberKeyword memberKeyword = MemberKeyword.builder()
                .memberSeq(memberSeq)
                .keywordName(keywordName)
                .build();
        memberKeywordRepository.deleteByMemberSeqAndKeywordName(memberSeq, keywordName);
    }
}