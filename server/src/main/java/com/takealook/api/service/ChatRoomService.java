package com.takealook.api.service;

import com.takealook.api.request.ChatRoomRegisterPostReq;
import com.takealook.db.entity.ChatRoom;
import org.springframework.data.redis.listener.ChannelTopic;

import java.util.List;

public interface ChatRoomService {

    ChatRoom createChatRoom(ChatRoomRegisterPostReq chatRoomRegisterPostReq);

    void enterChatRoom(String roomId);

    List<ChatRoom> getChatRooms(Long memberSeq);

    void deleteChatRoom(String roomId);
    ChannelTopic getTopic(String roomId);
}