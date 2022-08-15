package com.takealook.db.repository;

import com.takealook.api.response.ChatRoomMemberCountInterface;
import com.takealook.db.entity.ChatRoomMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatRoomMemberRepository extends JpaRepository<ChatRoomMember, Long> {
    ChatRoomMember getChatRoomMemberByMemberSeqAndRoomId(Long MemberSeq, String roomId);

    @Query("select count(roomId) as memberCount from ChatRoomMember where roomId = :roomId group by roomId")
    ChatRoomMemberCountInterface getChatRoomMemberCountByRoomId(String roomId);

}
