package com.takealook.db.repository;

import com.takealook.db.entity.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface ChatRoomRepository extends JpaRepository<ChatRoom, String> {
    @Transactional
    void deleteChatRoomByRoomId(String roomId);
}
