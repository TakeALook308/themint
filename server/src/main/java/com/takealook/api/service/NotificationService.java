package com.takealook.api.service;

import org.springframework.data.redis.listener.ChannelTopic;

import java.util.List;

public interface NotificationService {
//    void createNotificationServer(String memberId);
    void enterNotificationServer(String memberId);
    ChannelTopic getTopic(String memberId);
    void sendInterestCategoryNotificationMessage(String title, String hash, Long categorySeq);
    void sendInterestKeywordNotificationMessage(String title, String hash, List<String> productNameList);
}
