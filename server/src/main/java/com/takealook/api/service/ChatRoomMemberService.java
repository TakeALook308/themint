package com.takealook.api.service;

import com.takealook.api.response.ChatRoomMemberCountInterface;
import com.takealook.api.response.ChatRoomMemberCountRes;
import com.takealook.db.entity.ChatRoomMember;

public interface ChatRoomMemberService {
    ChatRoomMember saveChatRoomMember(String roomId, Long memberSeq);

    ChatRoomMemberCountRes getChatRoomMemberCount(String roomId);

}
