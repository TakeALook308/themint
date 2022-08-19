package com.takealook.db.repository;

import com.takealook.api.response.ChatRoomMemberCountInterface;
import com.takealook.db.entity.ChatRoomMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface ChatRoomMemberRepository extends JpaRepository<ChatRoomMember, Long> {
    ChatRoomMember getChatRoomMemberByMemberSeqAndRoomId(Long MemberSeq, String roomId);

    @Query("select count(roomId) as memberCount from ChatRoomMember where roomId = :roomId group by roomId")
    ChatRoomMemberCountInterface getChatRoomMemberCountByRoomId(String roomId);

    @Transactional // update, delete 필수
    @Modifying(clearAutomatically = true) // 영속성 컨텍스트 초기화
    int deleteByRoomIdAndAndMemberSeq(String roomId, Long memberSeq);

}
