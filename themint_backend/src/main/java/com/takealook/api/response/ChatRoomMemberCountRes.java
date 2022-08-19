package com.takealook.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ChatRoomMemberCountRes {
    String roomId;
    Long memberCount;
}
