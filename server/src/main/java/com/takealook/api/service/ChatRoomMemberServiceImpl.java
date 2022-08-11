package com.takealook.api.service;

import com.takealook.db.entity.ChatRoom;
import com.takealook.db.entity.ChatRoomMember;
import com.takealook.db.repository.ChatRoomMemberRepository;
import com.takealook.db.repository.ChatRoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatRoomMemberServiceImpl implements ChatRoomMemberService{

    @Autowired
    ChatRoomMemberRepository chatRoomMemberRepository;
    @Autowired
    ChatRoomRepository chatRoomRepository;

    @Override
    public ChatRoomMember saveChatRoomMember(String roomId, Long memberSeq) {
        ChatRoom chatRoomCheck = chatRoomRepository.getChatRoomByRoomId(roomId);
        ChatRoomMember duplicateCheck = chatRoomMemberRepository.getChatRoomMemberByMemberSeqAndRoomId(memberSeq, roomId);
        // 중복 입장 방지 or 생성된 채팅방 없음
        if (duplicateCheck != null || chatRoomCheck == null)
            return null;
        ChatRoomMember chatRoomMember = ChatRoomMember.builder()
                .roomId(roomId)
                .memberSeq(memberSeq)
                .build();
        return chatRoomMemberRepository.save(chatRoomMember);
    }
}
