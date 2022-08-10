package com.takealook.api.controller;

import com.takealook.api.request.ChatRoomRegisterPostReq;
import com.takealook.api.service.ChatRoomMemberService;
import com.takealook.api.service.ChatRoomService;
import com.takealook.common.auth.MemberDetails;
import com.takealook.db.entity.ChatRoom;
import com.takealook.db.entity.ChatRoomMember;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

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

    // 회원의 1:1 채팅 목록
    @GetMapping("/rooms")
    public List<ChatRoom> memberRooms(@ApiIgnore Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        return chatRoomService.getChatRooms(memberSeq);
    }

    // 채팅방 생성
    @PostMapping("/room")
    @ResponseBody
    public ChatRoom createRoom(@RequestBody ChatRoomRegisterPostReq chatRoomRegisterPostReq) {
        return chatRoomService.createChatRoom(chatRoomRegisterPostReq);
    }

    // 채팅방 입장 (JWT 토큰으로 memberSeq 인식)
    @PostMapping("/room/enter")
    public ChatRoomMember enterChatRoom(@RequestBody Map<String, String> roomIdMap, @ApiIgnore Authentication authentication) {
        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();
        Long memberSeq = memberDetails.getMemberSeq();
        return chatRoomMemberService.saveChatRoomMember(roomIdMap.get("roomId"), memberSeq);
    }

    // 채팅방 삭제( 실시간 경매 끝남 )
    @DeleteMapping("/room")
    public void deleteChatRoom(@RequestBody Map<String, String> roomIdMap) {
        chatRoomService.deleteChatRoom(roomIdMap.get("roomId"));
    }
}
