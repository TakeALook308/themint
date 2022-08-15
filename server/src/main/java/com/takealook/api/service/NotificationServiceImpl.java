package com.takealook.api.service;

import com.takealook.chat.RedisSubscriber;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class NotificationServiceImpl implements NotificationService{
    private final RedisMessageListenerContainer redisMessageListener;
    // 구독 처리 서비스
    private final RedisSubscriber redisSubscriber;
    private final RedisTemplate<String, Object> redisTemplate;
    private Map<String, ChannelTopic> topics;

    private ListOperations<String, Object> notificationServer;

    @PostConstruct
    private void init() {
        notificationServer = redisTemplate.opsForList();
        topics = new HashMap<>();
    }
    public void createNotificationServer(String memberId) {
        notificationServer.rightPush("NOTIFICATION_SERVER", memberId);
        enterNotificationServer(memberId);
    }

    public void enterNotificationServer(String memberId) {
        ChannelTopic topic = topics.get(memberId);
        if (topic == null)
            topic = new ChannelTopic(memberId);
        redisMessageListener.addMessageListener(redisSubscriber, topic);
        topics.put(memberId, topic);
    }

    public ChannelTopic getTopic(String memberId) {
        return topics.get(memberId);
    }
}
