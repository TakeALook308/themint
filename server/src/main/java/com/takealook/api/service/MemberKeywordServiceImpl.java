package com.takealook.api.service;

import com.takealook.db.entity.MemberKeyword;
import com.takealook.db.repository.MemberKeywordRepository;
import com.takealook.db.repository.MemberKeywordRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MemberKeywordServiceImpl implements MemberKeywordService{
    @Autowired
    MemberKeywordRepository memberKeywordRepository;

    @Autowired
    MemberKeywordRepositorySupport memberKeywordRepositorySupport;

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
        List<MemberKeyword> list = memberKeywordRepositorySupport.findKeywordNameByMemberSeq(memberSeq).orElse(null);
        return list;
    }

    @Override
    public void deleteKeyword(Long memberSeq, String keywordName) {
//        MemberKeyword
    }
}