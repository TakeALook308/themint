package com.takealook.api.service;

import com.takealook.chat.RedisPublisher;
import com.takealook.chat.RedisSubscriber;
import com.takealook.db.entity.ChatMessage;
import com.takealook.db.entity.ChatRoom;
import com.takealook.db.repository.ChatMessageRepository;
import com.takealook.db.repository.ChatRoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.listener.ChannelTopic;
import org.springframework.data.redis.listener.RedisMessageListenerContainer;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class ChatRoomServiceImpl implements ChatRoomService{
    private final RedisMessageListenerContainer redisMessageListener;
    // 구독 처리 서비스
    private final RedisSubscriber redisSubscriber;
    // Redis
    private static final String CHAT_ROOMS = "CHAT_ROOM";
    private final RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, String, ChatRoom> opsHashChatRoom;
    // 채팅방의 대화 메시지를 발행하기 위한 redis topic 정보. 서버별로 채팅방에 매치되는 topic정보를 Map에 넣어 roomId로 찾을수 있도록 한다.
    private Map<String, ChannelTopic> topics;

    private final RedisPublisher redisPublisher;
    @Autowired
    private ChatRoomRepository chatRoomRepository;
    @Autowired
    private ChatMessageRepository chatMessageRepository;

    @PostConstruct
    private void init() {
        opsHashChatRoom = redisTemplate.opsForHash();
        topics = new HashMap<>();
    }

    /**
     * 채팅방 생성 : 서버간 채팅방 공유를 위해 redis hash에 저장한다.
     */
    public ChatRoom createChatRoom(int type) {
        ChatRoom chatRoom = ChatRoom.create(type);
        opsHashChatRoom.put(CHAT_ROOMS, chatRoom.getRoomId(), chatRoom);
        chatRoomRepository.save(chatRoom);
        return chatRoom;
    }

    /**
     * 채팅방 입장 : redis에 topic을 만들고 pub/sub 통신을 하기 위해 리스너를 설정한다.
     */
    public void enterChatRoom(String roomId) {
        ChannelTopic topic = topics.get(roomId);
        if (topic == null)
            topic = new ChannelTopic(roomId);
        redisMessageListener.addMessageListener(redisSubscriber, topic);
        topics.put(roomId, topic);
        // 이전 메시지 출력
        List<ChatMessage> messages = chatMessageRepository.getChatMessagesByRoomId(roomId);
        for (ChatMessage message: messages) {
            redisPublisher.publish(topic, message);
        }
    }

    // 1:1 대화 내역 보기
    @Override
    public List<ChatRoom> getChatRooms(Long memberSeq) {
        return null;
    }

    @Override
    public void deleteChatRoom(String roomId) {
        chatRoomRepository.deleteChatRoomByRoomId(roomId);
    }

    public ChannelTopic getTopic(String roomId) {
        return topics.get(roomId);
    }



}
