package com.takealook.api.service;

import org.springframework.data.redis.listener.ChannelTopic;

import java.util.List;

public interface NotificationService {
    void createNotificationServer(String memberId);
    void enterNotificationServer(String memberId);
    ChannelTopic getTopic(String memberId);
    void sendInterestAuctionNotificationMessage(String hash);
    void sendInterestCategoryNotificationMessage(Long categorySeq);
    void sendInterestKeywordNotificationMessage(List<String> productNameList);
}
