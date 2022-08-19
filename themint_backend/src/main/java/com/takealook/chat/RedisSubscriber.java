package com.takealook.chat;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.takealook.db.entity.ChatMessage;
import com.takealook.db.entity.ChatNotificationMessage;
import com.takealook.db.entity.NotificationMessage;
import com.takealook.db.entity.ProductPrice;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisSubscriber implements MessageListener {

    private final ObjectMapper objectMapper;
    private final RedisTemplate redisTemplate;
    private final SimpMessageSendingOperations messagingTemplate;

    /**
     * Redis에서 메시지가 발행(publish)되면 대기하고 있던 onMessage가 해당 메시지를 받아 처리한다.
     */
    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            // redis에서 발행된 데이터를 받아 deserialize
            String publishMessage = (String) redisTemplate.getStringSerializer().deserialize(message.getBody());
            System.out.println("publicMessage " + publishMessage);
            // 받은 publishMessage 따라서 객체 맵핑 다르게 (경매 가격, 채팅 메시지)
            // 채팅 메시지를 받았다면
            if (publishMessage.contains("message")) {
                ChatMessage roomMessage = objectMapper.readValue(publishMessage, ChatMessage.class);
                // Websocket 구독자에게 메시지 Send
                messagingTemplate.convertAndSend("/sub/chat/room/" + roomMessage.getRoomId(), roomMessage);
            }
            // 경매 가격 메시지를 받았다면
            else if (publishMessage.contains("price")) {
                ProductPrice priceMessage = objectMapper.readValue(publishMessage, ProductPrice.class);
                // 현재 서버시간 설정
                priceMessage.setDate(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
                // Websocket 구독자에게 메시지 Send
                messagingTemplate.convertAndSend("/sub/chat/room/" + priceMessage.getRoomId(), priceMessage);
            }
            // 알림 메시지를 받았다면
            else if (publishMessage.contains("notification")){
                NotificationMessage notificationMessage = objectMapper.readValue(publishMessage, NotificationMessage.class);
                messagingTemplate.convertAndSend("/sub/notice/" + notificationMessage.getMemberId(), notificationMessage);
            }
            // 1:1 채팅 알림 메시지를 받았다면
            else {
                ChatNotificationMessage chatNotificationMessage = objectMapper.readValue(publishMessage, ChatNotificationMessage.class);
                messagingTemplate.convertAndSend("/sub/notice/" + chatNotificationMessage.getReceiverId(), chatNotificationMessage);
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }
    }
}
