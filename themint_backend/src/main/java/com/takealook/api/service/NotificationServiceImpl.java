package com.takealook.api.service;

import com.takealook.chat.RedisPublisher;
import com.takealook.chat.RedisSubscriber;
import com.takealook.db.entity.NotificationMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class NotificationServiceImpl implements NotificationService{
    private final RedisMessageListenerContainer redisMessageListener;
    // 구독 처리 서비스
    private final RedisSubscriber redisSubscriber;
    private final RedisPublisher redisPublisher;
    private final RedisTemplate<String, Object> redisTemplate;
    private Map<String, ChannelTopic> topics;
    private ListOperations<String, Object> notificationServer;

    @Autowired
    InterestAuctionService interestAuctionService;
    @Autowired
    InterestCategoryService interestCategoryService;
    @Autowired
    InterestKeywordServiceImpl interestKeywordService;

    @PostConstruct
    private void init() {
        notificationServer = redisTemplate.opsForList();
        topics = new HashMap<>();
    }
//    public void createNotificationServer(String memberId) {
//        notificationServer.rightPush("NOTIFICATION_SERVER", memberId);
//        enterNotificationServer(memberId);
//    }

    // 서버 시작과 동시에 모든 토픽 생성 (common/util/initService)
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

    // 관심 카테고리 경매 등록 알림 메시지 전송
    public void sendInterestCategoryNotificationMessage(String title, String hash, Long categorySeq) {
        List<String> memberIdList = interestCategoryService.getMemberListByCategorySeq(categorySeq);
        for (String memberId : memberIdList) {
            String notification = memberId + "님의 관심 카테고리 경매가 등록됐어요!";
            NotificationMessage notificationMessage = NotificationMessage.builder()
                    .memberId(memberId)
                    .title(title)
                    .url("/auctions/" + hash)
                    .notification(notification)
                    .type(1)
                    .build();
            redisPublisher.publish(topics.get(memberId), notificationMessage);
        }
    }

    // 관심 키워드 경매 등록 알림 메시지 전송
    public void sendInterestKeywordNotificationMessage(String title, String hash, List<String> productNameList) {
        String productNameResult = "";
        for(String productName: productNameList) {
            productNameResult += productName;
            productNameResult += " ";
        }
        List<String> memberIdList = interestKeywordService.getMemberListByProductName(productNameResult);
        for (String memberId : memberIdList) {
            String notification = memberId + "님의 관심 키워드 경매가 등록됐어요!";
            NotificationMessage notificationMessage = NotificationMessage.builder()
                    .memberId(memberId)
                    .title(title)
                    .url("/auctions/" + hash)
                    .notification(notification)
                    .type(1)
                    .build();
            redisPublisher.publish(topics.get(memberId), notificationMessage);
        }
    }

    @Override
    public void sendSuccessfulBidNotificationMessage(String memberId, Long memberSeq, int price) {
        NotificationMessage notificationMessage = NotificationMessage.builder()
                .memberId(memberId)
                .title("낙찰에 성공했습니다!")
                .url("/profile/" + memberSeq + "/purchasehistory")
                .notification("구매 정보를 입력해주세요.")
                .type(1)
                .build();
        redisPublisher.publish(topics.get(memberId), notificationMessage);
    }
}
