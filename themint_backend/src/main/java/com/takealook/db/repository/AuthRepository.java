package com.takealook.db.repository;

import com.takealook.db.entity.Auth;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import javax.transaction.Transactional;

public interface AuthRepository extends JpaRepository<Auth, String> {
    Auth getAuthByAuthKey(String authKey);

    @Transactional // update, delete 필수
    @Modifying(clearAutomatically = true) // 영속성 컨텍스트 초기화
    int deleteByAuthKey(String authKey);
}
