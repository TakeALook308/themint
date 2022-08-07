package com.takealook.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatRoomRegisterPostReq {
    String roomId;
    int type;
}
