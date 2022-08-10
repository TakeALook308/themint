package com.takealook.api.service;

import com.takealook.db.entity.InterestKeyword;
import com.takealook.db.repository.InterestKeywordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InterestKeywordServiceImpl implements InterestKeywordService {
    @Autowired
    InterestKeywordRepository interestKeywordRepository;

    /*
        관심 키워드 생성, 조회, 삭제
     */
    @Override
    public InterestKeyword createInterestKeyword(Long memberSeq, String keywordName) {
        InterestKeyword interestKeyword = InterestKeyword.builder()
                .memberSeq(memberSeq)
                .keywordName(keywordName)
                .build();
        interestKeywordRepository.save(interestKeyword);
        return interestKeyword;
    }

    @Override
    public List<String> getInterestKeywordListByMemberSeq(Long memberSeq) {
        List<String> list = new ArrayList<>();
        List<InterestKeyword> interestKeywordList = interestKeywordRepository.findAllByMemberSeq(memberSeq).orElse(null);
        for (InterestKeyword interestKeyword : interestKeywordList){
            list.add(interestKeyword.getKeywordName());
        }
        return list;
    }

    @Override
    public void deleteKeyword(Long memberSeq, String keywordName) {
        interestKeywordRepository.deleteByMemberSeqAndKeywordName(memberSeq, keywordName);
    }
}