package com.takealook.api.controller;

import com.takealook.api.response.ChatMessagesRes;
import com.takealook.api.service.*;
import com.takealook.chat.RedisPublisher;
import com.takealook.db.entity.*;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import springfox.documentation.annotations.ApiIgnore;

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
    @Autowired
    NotificationService notificationService;

    @Autowired
    MemberService memberService;

    /**
     * websocket "/pub/api/chat/message"로 들어오는 메시징을 처리한다.
     */

    @MessageMapping("/chat/message")
    public void message(ChatMessage message) {
        System.out.println(message.toString());
        if (message.getType() == 0) { // 입장 메시지
//            chatRoomService.enterChatRoom(message.getRoomId());
            message.setMessage(message.getNickname() + "님이 입장하셨습니다.");
        } else if (message.getType() == 2) { // 1:1 채팅 메시지
            // 1:1 메시지 알림 보내주기
            String[] memberSeqList = message.getRoomId().split("to");
            for (String memberSeq : memberSeqList) {
                if (!Long.toString(message.getMemberSeq()).equals(memberSeq)) { // 메시지 받은 사람 찾기
                    Member member = memberService.getMemberByMemberSeq(Long.parseLong(memberSeq));
                    ChatNotificationMessage chatNotificationMessage = ChatNotificationMessage.builder() // 채팅 알림 메시지
                            .roomId(message.getRoomId())
                            .receiverId(member.getMemberId())
                            .previewMsg(message.getMessage())
                            .senderNickname(message.getNickname())
                            .date(message.getDate())
                            .build();
                    redisPublisher.publish(notificationService.getTopic(member.getMemberId()), chatNotificationMessage);
                }
            }
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

}
