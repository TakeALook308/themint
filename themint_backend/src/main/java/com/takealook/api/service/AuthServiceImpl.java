package com.takealook.api.service;

import com.takealook.db.entity.Auth;
import com.takealook.db.repository.AuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService{

    @Autowired
    AuthRepository authRepository;

    @Override
    public void deleteAuth(String phone) {
        authRepository.deleteById(phone);
    }

    @Override
    public void insertAuth(String phone, int randNum) {
        Auth auth = Auth.builder()
                .authKey(phone)
                .authNum(randNum)
                .build();
        authRepository.save(auth);
    }

    @Override
    public Auth getAuth(String key) {
        return authRepository.getAuthByAuthKey(key);
    }
}
