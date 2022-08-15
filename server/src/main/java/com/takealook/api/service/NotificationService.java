package com.takealook.api.service;

import org.springframework.data.redis.listener.ChannelTopic;

public interface NotificationService {
    void createNotificationServer(String memberId);
    void enterNotificationServer(String memberId);
    ChannelTopic getTopic(String memberId);
}
