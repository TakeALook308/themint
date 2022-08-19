package com.takealook.api.service;

import com.takealook.db.entity.ChatMessage;
import com.takealook.db.repository.ChatMessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatMessageServiceImpl implements ChatMessageService{

    @Autowired
    ChatMessageRepository chatMessageRepository;

    @Override
    public ChatMessage saveMessage(ChatMessage message) {
        return chatMessageRepository.save(message);
    }

    @Override
    public List<ChatMessage> getChatMessages(String roomId) {
        return chatMessageRepository.getChatMessagesByRoomId(roomId);
    }
}
