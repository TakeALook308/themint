package com.takealook.api.service;

import com.takealook.db.entity.ChatRoomMember;

public interface ChatRoomMemberService {
    ChatRoomMember saveChatRoomMember(String roomId, Long memberSeq);
}
