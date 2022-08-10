package com.takealook.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 *
 * 1:1 채팅방 리스트 응답값
 *
 */

@Getter
@Setter
@Builder
public class ChatRoomRes {
    String roomId;
    String nickname;
    String profileUrl;
    String lastChat;
}
