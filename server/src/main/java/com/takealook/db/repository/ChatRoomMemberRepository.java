package com.takealook.db.repository;

import com.takealook.db.entity.ChatRoomMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomMemberRepository extends JpaRepository<ChatRoomMember, Long> {
    ChatRoomMember getChatRoomMemberByMemberSeqAndRoomId(Long MemberSeq, String roomId);
}
