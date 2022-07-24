package com.takealook.api.service;

import com.takealook.api.request.MemberKeywordRegisterPostReq;
import com.takealook.db.entity.MemberKeyword;
import com.takealook.db.repository.MemberKeywordRepository;
import com.takealook.db.repository.MemberKeywordRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;

public class MemberKeywordServiceImpl implements MemberKeywordService{
    @Autowired
    MemberKeywordRepository memberKeywordRepository;

    @Autowired
    MemberKeywordRepositorySupport memberKeywordRepositorySupport;

    @Override
    public MemberKeyword createMemberKeyword(MemberKeywordRegisterPostReq memberKeywordRegisterPostReq) {
        return null;
    }
}
