package com.takealook.api.controller;

import com.takealook.api.request.ChatRoomPostReq;
import com.takealook.api.request.ChatRoomRegisterPostReq;
import com.takealook.api.request.OneOnOneChatRoomRegisterPostReq;
import com.takealook.api.response.ChatMessagesRes;
import com.takealook.api.response.ChatRoomMemberCountRes;
import com.takealook.api.service.ChatMessageService;
import com.takealook.api.service.ChatRoomMemberService;
import com.takealook.api.service.ChatRoomService;
import com.takealook.common.auth.MemberDetails;
import com.takealook.common.model.response.BaseResponseBody;
import com.takealook.db.entity.ChatMessage;
import com.takealook.db.entity.ChatRoomMember;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Api(value = "채팅방 API", tags = {"ChatRoom"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    @Autowired
    ChatRoomMemberService chatRoomMemberService;

    @Autowired
    ChatMessageService chatMessageService;

    // 회원의 1:1 채팅 목록
    @GetMapping("/rooms")
    public ResponseEntity<?> memberRooms(@ApiIgnore Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        return ResponseEntity.status(200).body(chatRoomService.getChatRooms(memberSeq));
    }

    // 경매 채팅방 생성
    @PostMapping("/room/auction")
    @ResponseBody
    public ResponseEntity<?> createAuctionChatRoom(@RequestBody ChatRoomRegisterPostReq chatRoomRegisterPostReq) {
        return ResponseEntity.status(200).body(chatRoomService.createAuctionChatRoom(chatRoomRegisterPostReq));
    }
    
    // 1:1 채팅방 생성
    @PostMapping("/room/one")
    public  ResponseEntity<?> createOneOnOneChatRoom(@RequestBody OneOnOneChatRoomRegisterPostReq oneOnOneChatRoomRegisterPostReq) {
        return ResponseEntity.status(200).body(chatRoomService.createOneOnOneChatRoom(oneOnOneChatRoomRegisterPostReq));
    }

    // 채팅방 입장
    @PostMapping("/room/enter")
    public ResponseEntity<?> enterChatRoom(@RequestBody ChatRoomPostReq ChatRoomPostReq) {
        ChatRoomMember chatRoomMember = chatRoomMemberService.saveChatRoomMember(ChatRoomPostReq.getRoomId(), ChatRoomPostReq.getMemberSeq());
        if (chatRoomMember == null)
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "이미 참여 중인 채팅방입니다.")); // 이미 입장한 채팅방
        return ResponseEntity.status(200).body(chatRoomMemberService.getChatRoomMemberCount(chatRoomMember.getRoomId()));
    }

    // 채팅방 퇴장
    @PostMapping("/room/exit")
    public ResponseEntity<?> exitChatRoom(@RequestBody ChatRoomPostReq chatRoomPostReq) {
        int result = chatRoomMemberService.exitChatRoomMember(chatRoomPostReq.getRoomId(), chatRoomPostReq.getMemberSeq());
        if (result == 0) // 채팅방 퇴장 실패
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "채팅방에 없는 사용자입니다."));
        return ResponseEntity.status(200).body(chatRoomMemberService.getChatRoomMemberCount(chatRoomPostReq.getRoomId()));
    }

    // 채팅 내역 불러오기
    @PostMapping("/history")
    public ResponseEntity<?> getChatHistory(@RequestBody Map<String, String> roomIdMap) {
        String roomId = roomIdMap.get("roomId");
        List<ChatMessage> chatMessages = chatMessageService.getChatMessages(roomId);
        List<ChatMessagesRes> chatMessagesRes = new ArrayList<>();
        for (ChatMessage chatMessage: chatMessages) {
            chatMessagesRes.add(ChatMessagesRes.of(chatMessage.getNickname(), chatMessage.getMessage(), chatMessage.getDate()));
        }
        return ResponseEntity.status(200).body(chatMessagesRes);
    }

    // 채팅방 삭제( 실시간 경매 끝남 )
    @DeleteMapping("/room")
    public ResponseEntity<?> deleteChatRoom(@RequestBody Map<String, String> roomIdMap) {
        chatRoomService.deleteChatRoom(roomIdMap.get("roomId"));
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }
}
