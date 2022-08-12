package com.takealook.api.service;


import com.takealook.db.entity.ChatMessage;

import java.util.List;

public interface ChatMessageService {

    ChatMessage saveMessage(ChatMessage message);
    List<ChatMessage> getChatMessages(String roomId);
}
