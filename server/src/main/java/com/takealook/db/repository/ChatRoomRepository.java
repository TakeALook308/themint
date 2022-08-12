package com.takealook.db.repository;

import com.takealook.api.response.ChatRoomsInterface;
import com.takealook.db.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, String> {
    @Transactional // update, delete 필수
    @Modifying(clearAutomatically = true) // 영속성 컨텍스트 초기화
    void deleteChatRoomByRoomId(String roomId);

    ChatRoom getChatRoomByRoomId(String roomId);

    @Query(value = "select d.room_id as roomId, d.member_seq as memberSeq, a.nickname, a.profile_url as profileUrl from member a\n" +
            "join \n" +
            "(select b.room_id, b.member_seq from chat_room_member b \n" +
            "join\n" +
            "(select * from chat_room_member\n" +
            "where member_seq = :memberSeq) c\n" +
            "on b.room_id = c.room_id\n" +
            "where b.member_seq != :memberSeq) d\n" +
            "on d.member_seq = a.seq;", nativeQuery = true)
    List<ChatRoomsInterface> getChatRooms(Long memberSeq);
}
