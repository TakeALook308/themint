package com.takealook.api.controller;

import com.takealook.api.request.ChatRoomRegisterPostReq;
import com.takealook.api.request.EnterChatRoomPostReq;
import com.takealook.api.response.ChatRoomMemberCountInterface;
import com.takealook.api.response.ChatRoomMemberCountRes;
import com.takealook.api.service.ChatRoomMemberService;
import com.takealook.api.service.ChatRoomService;
import com.takealook.common.auth.MemberDetails;
import com.takealook.common.model.response.BaseResponseBody;
import com.takealook.db.entity.ChatRoomMember;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import java.util.Map;

@Api(value = "채팅방 API", tags = {"ChatRoom"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChatRoomController {

    private final ChatRoomService chatRoomService;

    @Autowired
    ChatRoomMemberService chatRoomMemberService;

    // 회원의 1:1 채팅 목록
    @GetMapping("/rooms")
    public ResponseEntity<?> memberRooms(@ApiIgnore Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        return ResponseEntity.status(200).body(chatRoomService.getChatRooms(memberSeq));
    }

    // 채팅방 생성
    @PostMapping("/room")
    @ResponseBody
    public ResponseEntity<?> createRoom(@RequestBody ChatRoomRegisterPostReq chatRoomRegisterPostReq) {
        return ResponseEntity.status(200).body(chatRoomService.createChatRoom(chatRoomRegisterPostReq));
    }

    // 채팅방 입장
    @PostMapping("/room/enter")
    public ResponseEntity<?> enterChatRoom(@RequestBody EnterChatRoomPostReq enterChatRoomPostReq) {
        ChatRoomMember chatRoomMember = chatRoomMemberService.saveChatRoomMember(enterChatRoomPostReq.getRoomId(), enterChatRoomPostReq.getMemberSeq());
        if (chatRoomMember == null)
            return ResponseEntity.status(409).body(BaseResponseBody.of(409, "이미 참여 중인 채팅방입니다.")); // 이미 입장한 채팅방
        ChatRoomMemberCountRes chatRoomMemberCountRes = chatRoomMemberService.getChatRoomMemberCount(chatRoomMember.getRoomId());
        return ResponseEntity.status(200).body(chatRoomMemberCountRes);
    }

    // 채팅 내역 불러오기

    // 채팅방 삭제( 실시간 경매 끝남 )
    @DeleteMapping("/room")
    public ResponseEntity<?> deleteChatRoom(@RequestBody Map<String, String> roomIdMap) {
        chatRoomService.deleteChatRoom(roomIdMap.get("roomId"));
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "success"));
    }
}
