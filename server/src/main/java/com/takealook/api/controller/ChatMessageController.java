package com.takealook.api.controller;

import com.takealook.api.response.ChatMessagesRes;
import com.takealook.api.service.ChatMessageService;
import com.takealook.api.service.ChatRoomService;
import com.takealook.chat.RedisPublisher;
import com.takealook.db.entity.ChatMessage;
import com.takealook.db.entity.ProductPrice;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {
        System.out.println(message.toString());
        if (message.getType() == 0) { // 입장 메시지
            chatRoomService.enterChatRoom(message.getRoomId());
            message.setMessage(message.getNickname() + "님이 입장하셨습니다.");
        }
        chatMessageService.saveMessage(message);
        // Websocket에 발행된 메시지를 redis로 발행한다(publish)
        redisPublisher.publish(chatRoomService.getTopic(message.getRoomId()), message);
    }

    @MessageMapping("/product/message")
    public void message(ProductPrice productPrice) {
        System.out.println(productPrice.toString());
        // TODO: db에 저장할지 말지 (저장안하면 ProductPriceService 삭제)
        // Websocket에 발행된 메시지를 redis로 발행한다(publish)
        redisPublisher.publish(chatRoomService.getTopic(productPrice.getRoomId()), productPrice);
    }

    @PostMapping("/chat/history")
    public ResponseEntity<?> getChatHistory(@RequestBody Map<String, String> roomIdMap) {
        String roomId = roomIdMap.get("roomId");
        List<ChatMessage> chatMessages = chatMessageService.getChatMessages(roomId);
        List<ChatMessagesRes> chatMessagesRes = new ArrayList<>();
        for (ChatMessage chatMessage: chatMessages) {
            chatMessagesRes.add(ChatMessagesRes.of(chatMessage.getNickname(), chatMessage.getMessage(), chatMessage.getDate()));
        }
        return ResponseEntity.status(200).body(chatMessagesRes);
    }
}
