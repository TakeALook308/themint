package com.takealook.api.service;

import com.takealook.api.request.ChatRoomRegisterPostReq;
import com.takealook.api.request.OneOnOneChatRoomRegisterPostReq;
import com.takealook.api.response.ChatRoomsInterface;
import com.takealook.db.entity.ChatRoom;
import org.springframework.data.redis.listener.ChannelTopic;

import java.util.List;

public interface ChatRoomService {

    ChatRoom createAuctionChatRoom(ChatRoomRegisterPostReq chatRoomRegisterPostReq);
    ChatRoom createOneOnOneChatRoom(OneOnOneChatRoomRegisterPostReq oneOnOneChatRoomRegisterPostReq);
    void enterChatRoom(String roomId);

    List<ChatRoomsInterface> getChatRooms(Long memberSeq);

    void deleteChatRoom(String roomId);
    ChannelTopic getTopic(String roomId);
}
