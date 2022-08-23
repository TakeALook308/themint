package com.takealook.api.service;

import com.takealook.db.entity.Auth;

public interface AuthService {
    void deleteAuth(String key);
    void insertAuth(String key, int randNum);

    Auth getAuth(String key);
}
