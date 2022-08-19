package com.takealook.chat;

import com.takealook.db.entity.ChatMessage;
import com.takealook.db.entity.ChatNotificationMessage;
import com.takealook.db.entity.NotificationMessage;
import com.takealook.db.entity.ProductPrice;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class RedisPublisher {

    private final RedisTemplate<String, Object> redisTemplate;

    public void publish(ChannelTopic topic, ChatMessage message) {
        redisTemplate.convertAndSend(topic.getTopic(), message);
    }
    public void publish(ChannelTopic topic, ProductPrice productPrice) {
        redisTemplate.convertAndSend(topic.getTopic(), productPrice);
    }
    public void publish(ChannelTopic topic, NotificationMessage notificationMessage) {
        redisTemplate.convertAndSend(topic.getTopic(), notificationMessage);
    }

    public void publish(ChannelTopic topic, ChatNotificationMessage chatNotificationMessage) {
        redisTemplate.convertAndSend(topic.getTopic(), chatNotificationMessage);
    }
}
