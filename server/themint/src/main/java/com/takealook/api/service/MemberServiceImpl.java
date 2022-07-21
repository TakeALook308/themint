package com.takealook.api.service;

import com.takealook.api.request.MemberRegisterPostReq;
import com.takealook.db.entity.Member;
import com.takealook.db.repository.MemberRepository;
import com.takealook.db.repository.MemberRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * 멤버 관련 비즈니스 로직 처리를 위한 서비스 구현
 */
@Service
public class MemberServiceImpl implements MemberService{
    @Autowired
    MemberRepository memberRepository;

    @Autowired
    MemberRepositorySupport memberRepositorySupport;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public Member createMember(MemberRegisterPostReq memberRegisterPostReq) {
        return null;
    }
}
