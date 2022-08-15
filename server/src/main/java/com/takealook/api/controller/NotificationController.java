package com.takealook.api.controller;

import com.takealook.api.service.InterestAuctionService;
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
@RequestMapping("notice")
public class NotificationController {

    @Autowired
    NotificationService notificationService;

    @Autowired
    InterestAuctionService interestAuctionService;

    private final RedisPublisher redisPublisher;

    // 알림서버 생성
    @GetMapping("/create")
    public ResponseEntity<?> createNotificationServer(@RequestParam String memberId) {
        notificationService.createNotificationServer(memberId);
        return ResponseEntity.status(200).body("success");
    }
    
    // 관심 경매 시작 알림 메시지 전송
    @PostMapping("send")
    public ResponseEntity<?> sendNotificationMessage(@RequestBody Map<String, String> auctionHash) {
        String hash = auctionHash.get("hash");
        List<String> memberList = interestAuctionService.getMemberListByHash(hash);
        for(String memberId: memberList) {
            String message = memberId + "님의 관심 경매가 시작됐어요!";
            NotificationMessage notificationMessage = NotificationMessage.builder()
                    .memberId(memberId)
                    .message(message)
                    .build();
            redisPublisher.publish(notificationService.getTopic(memberId), notificationMessage);
        }
        return ResponseEntity.status(200).body("success");
    }
}
