package com.takealook.api.service;

import com.takealook.api.request.MemberKeywordRegisterPostReq;
import com.takealook.db.entity.MemberKeyword;

public interface MemberKeywordService {
    MemberKeyword createMemberKeyword(MemberKeywordRegisterPostReq memberKeywordRegisterPostReq);
}
