package com.takealook.api.controller;

import com.takealook.api.service.ChatMessageService;
import com.takealook.api.service.ChatRoomService;
import com.takealook.chat.RedisPublisher;
import com.takealook.common.auth.MemberDetails;
import com.takealook.db.entity.ChatMessage;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import springfox.documentation.annotations.ApiIgnore;
@Api(value = "채팅메시지 API", tags = {"ChatMessage"})
@RequiredArgsConstructor
@Controller
public class ChatMessageController {

    private final RedisPublisher redisPublisher;
    private final ChatRoomService chatRoomService;

    @Autowired
    ChatMessageService chatMessageService;
    /**
     * websocket "/pub/api/chat/message"로 들어오는 메시징을 처리한다.
     */
    // JWT 버전
    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {
        if (message.getType() == 0) { // 입장 메시지
            chatRoomService.enterChatRoom(message.getRoomId());
            message.setMessage(message.getNickname() + "님이 입장하셨습니다.");
        }
        chatMessageService.saveMessage(message);
        // Websocket에 발행된 메시지를 redis로 발행한다(publish)
        redisPublisher.publish(chatRoomService.getTopic(message.getRoomId()), message);
    }
}
