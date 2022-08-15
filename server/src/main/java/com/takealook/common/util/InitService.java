package com.takealook.common.util;

import com.takealook.api.service.NotificationService;
import com.takealook.db.entity.Member;
import com.takealook.db.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.List;

// 서버 시작과 동시에 실행되는 컴포넌트
@Component
public class InitService implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    NotificationService notificationService;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        List<Member> memberList = memberRepository.findAll();
        for (Member member: memberList) {
            String memberId = member.getMemberId();
            notificationService.enterNotificationServer(memberId);
        }
    }
}
