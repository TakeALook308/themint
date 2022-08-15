package com.takealook.db.entity;


import com.takealook.api.request.ChatRoomRegisterPostReq;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.UUID;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ChatRoom implements Serializable {

    private static final long serialVersionUID = 6494678977089006639L;

    @Id
    private String roomId;

    public static ChatRoom create(String roomId) {
        ChatRoom chatRoom = ChatRoom.builder()
                .roomId(roomId)
                .build();
        return chatRoom;
    }
}
