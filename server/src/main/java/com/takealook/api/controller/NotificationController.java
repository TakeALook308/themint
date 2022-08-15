package com.takealook.api.controller;

import com.takealook.api.service.InterestAuctionService;
import com.takealook.api.service.InterestCategoryService;
import com.takealook.api.service.NotificationService;
import com.takealook.chat.RedisPublisher;
import com.takealook.db.entity.NotificationMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class NotificationController {

    @Autowired
    NotificationService notificationService;

    @Autowired
    InterestAuctionService interestAuctionService;

    @Autowired
    InterestCategoryService interestCategoryService;

    private final RedisPublisher redisPublisher;

    // 알림서버 생성
    @GetMapping("/create")
    public ResponseEntity<?> createNotificationServer(@RequestParam String memberId) {
        notificationService.createNotificationServer(memberId);
        return ResponseEntity.status(200).body("success");
    }

    // 관심 경매 시작 알림 메시지 전송
    @PostMapping("/notice/interest/auction")
    public ResponseEntity<?> sendInterestAuctionNotificationMessage(@RequestBody Map<String, String> auctionHash) {
        String hash = auctionHash.get("hash");
        List<String> memberIdList = interestAuctionService.getMemberListByHash(hash);
        for(String memberId: memberIdList) {
            String message = memberId + "님의 관심 경매가 시작됐어요!";
            NotificationMessage notificationMessage = NotificationMessage.builder()
                    .memberId(memberId)
                    .message(message)
                    .build();
            redisPublisher.publish(notificationService.getTopic(memberId), notificationMessage);
        }
        return ResponseEntity.status(200).body("success");
    }

    // 관심 카테고리 경매 등록 알림 메시지 전송
    @PostMapping("/notice/interest/category")
    public ResponseEntity<?> sendInterestCategoryNotificationMessage(@RequestBody Map<String, Long> category) {
        Long categorySeq = category.get("categorySeq");
        List<String> memberIdList = interestCategoryService.getMemberListByCategorySeq(categorySeq);
        for (String memberId : memberIdList) {
            String message = memberId + "님의 관심 카테고리 경매가 등록됐어요!";
            NotificationMessage notificationMessage = NotificationMessage.builder()
                    .memberId(memberId)
                    .message(message)
                    .build();
            redisPublisher.publish(notificationService.getTopic(memberId), notificationMessage);
        }
        return ResponseEntity.status(200).body("success");
    }

    // 관심 키워드 경매 등록 알림 메시지 전송
    @PostMapping("/notice/interest/keyword")
    public ResponseEntity<?> sendInterestKeywordNotificationMessage() {
        return null;
    }
}
