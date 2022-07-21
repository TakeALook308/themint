package com.takealook.api.service;

import com.takealook.api.request.MemberRegisterPostReq;
import com.takealook.db.entity.Member;

public interface MemberService {
    Member createMember(MemberRegisterPostReq memberRegisterPostReq);
}
