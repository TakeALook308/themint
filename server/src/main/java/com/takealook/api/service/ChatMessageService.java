package com.takealook.api.service;


import com.takealook.db.entity.ChatMessage;

public interface ChatMessageService {

    ChatMessage saveMessage(ChatMessage message);
}
