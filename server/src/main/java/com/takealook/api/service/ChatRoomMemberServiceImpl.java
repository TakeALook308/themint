package com.takealook.api.service;

import com.takealook.api.response.ChatRoomMemberCountInterface;
import com.takealook.api.response.ChatRoomMemberCountRes;
import com.takealook.db.entity.ChatRoom;
import com.takealook.db.entity.ChatRoomMember;
import com.takealook.db.entity.Member;
import com.takealook.db.repository.ChatRoomMemberRepository;
import com.takealook.db.repository.ChatRoomRepository;
import com.takealook.db.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatRoomMemberServiceImpl implements ChatRoomMemberService{

    @Autowired
    ChatRoomMemberRepository chatRoomMemberRepository;
    @Autowired
    ChatRoomRepository chatRoomRepository;
    @Autowired
    MemberRepository memberRepository;

    @Override
    public ChatRoomMember saveChatRoomMember(String roomId, Long memberSeq) {
        Member member = memberRepository.findBySeq(memberSeq);
        ChatRoom chatRoomCheck = chatRoomRepository.getChatRoomByRoomId(roomId);
        ChatRoomMember duplicateCheck = chatRoomMemberRepository.getChatRoomMemberByMemberSeqAndRoomId(memberSeq, roomId);
        // 중복 입장 방지 or 생성된 채팅방 없음
        if (duplicateCheck != null || chatRoomCheck == null || member == null)
            return null;
        ChatRoomMember chatRoomMember = ChatRoomMember.builder()
                .roomId(roomId)
                .memberSeq(memberSeq)
                .build();
        return chatRoomMemberRepository.save(chatRoomMember);

    }

    @Override
    public int exitChatRoomMember(String roomId, Long memberSeq) {
        return chatRoomMemberRepository.deleteByRoomIdAndAndMemberSeq(roomId, memberSeq);
    }

    @Override
    public ChatRoomMemberCountRes getChatRoomMemberCount(String roomId) {
        ChatRoomMemberCountInterface chatRoomMemberCountInterface = chatRoomMemberRepository.getChatRoomMemberCountByRoomId(roomId);
        Long memberCount = chatRoomMemberCountInterface.getMemberCount();
        ChatRoomMemberCountRes chatRoomMemberCountRes = ChatRoomMemberCountRes.builder()
                .memberCount(memberCount)
                .roomId(roomId)
                .build();
        return chatRoomMemberCountRes;
    }
}
