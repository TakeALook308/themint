package com.takealook.api.service;

import com.takealook.api.request.MemberKeywordRegisterPostReq;
import com.takealook.db.entity.MemberKeyword;
import com.takealook.db.repository.MemberKeywordRepository;
import com.takealook.db.repository.MemberKeywordRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MemberKeywordServiceImpl implements MemberKeywordService{
    @Autowired
    MemberKeywordRepository memberKeywordRepository;

    @Autowired
    MemberKeywordRepositorySupport memberKeywordRepositorySupport;

    @Override
    public MemberKeyword createMemberKeyword(Long memberSeq, String keywordName) {
        return null;
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