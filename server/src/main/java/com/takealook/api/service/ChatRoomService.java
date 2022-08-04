package com.takealook.api.service;

import com.takealook.db.entity.ChatRoom;
import org.springframework.data.redis.listener.ChannelTopic;

import java.util.List;

public interface ChatRoomService {

    ChatRoom createChatRoom(int type);

    void enterChatRoom(String roomId);

    List<ChatRoom> getChatRooms(Long memberSeq);

    void deleteChatRoom(String roomId);
    ChannelTopic getTopic(String roomId);
}
