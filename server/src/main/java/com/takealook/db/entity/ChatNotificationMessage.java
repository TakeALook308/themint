package com.takealook.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ChatNotificationMessage {
    String roomId;
    String receiverId;
    String previewMsg;
    String senderNickname;
    String date;
}
