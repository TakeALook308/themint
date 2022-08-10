package com.takealook.api.service;

import com.takealook.db.entity.ChatRoomMember;
import com.takealook.db.repository.ChatRoomMemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatRoomMemberServiceImpl implements ChatRoomMemberService{

    @Autowired
    ChatRoomMemberRepository chatRoomMemberRepository;

    @Override
    public ChatRoomMember saveChatRoomMember(String roomId, Long memberSeq) {
        ChatRoomMember duplicateCheck = chatRoomMemberRepository.getChatRoomMemberByMemberSeqAndRoomId(memberSeq, roomId);
        // 중복 방지
        if (duplicateCheck != null)
            return null;
        ChatRoomMember chatRoomMember = ChatRoomMember.builder()
                .roomId(roomId)
                .memberSeq(memberSeq)
                .build();
        return chatRoomMemberRepository.save(chatRoomMember);
    }
}
