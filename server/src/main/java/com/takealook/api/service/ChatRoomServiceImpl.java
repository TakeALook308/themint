package com.takealook.api.service;

import com.takealook.api.request.ChatRoomRegisterPostReq;
import com.takealook.api.request.OneOnOneChatRoomRegisterPostReq;
import com.takealook.api.response.ChatRoomsInterface;
import com.takealook.chat.RedisPublisher;
import com.takealook.chat.RedisSubscriber;
import com.takealook.common.util.HashUtil;
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
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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
    public ChatRoom createAuctionChatRoom(ChatRoomRegisterPostReq chatRoomRegisterPostReq) {
        ChatRoom chatRoom = ChatRoom.create(chatRoomRegisterPostReq.getRoomId());
        opsHashChatRoom.put(CHAT_ROOMS, chatRoom.getRoomId(), chatRoom);
        chatRoomRepository.save(chatRoom);
        enterChatRoom(chatRoom.getRoomId());
        return chatRoom;
    }

    // 1:1 채팅방 생성
    public ChatRoom createOneOnOneChatRoom(OneOnOneChatRoomRegisterPostReq oneOnOneChatRoomRegisterPostReq) {
        String seq1;
        String seq2;
        if (oneOnOneChatRoomRegisterPostReq.getMemberSeq1() < oneOnOneChatRoomRegisterPostReq.getMemberSeq2()) {
            seq1 = Long.toString(oneOnOneChatRoomRegisterPostReq.getMemberSeq1());
            seq2 = Long.toString(oneOnOneChatRoomRegisterPostReq.getMemberSeq2());
        }
        else {
            seq1 = Long.toString(oneOnOneChatRoomRegisterPostReq.getMemberSeq2());
            seq2 = Long.toString(oneOnOneChatRoomRegisterPostReq.getMemberSeq1());
        }
        String roomId = seq1 + "to" + seq2;
        ChatRoom chatRoom = ChatRoom.create(roomId);
        opsHashChatRoom.put(CHAT_ROOMS, chatRoom.getRoomId(), chatRoom);
        chatRoomRepository.save(chatRoom);
        enterChatRoom(chatRoom.getRoomId());
        return chatRoom;
    }

    /**
     * 채팅방 입장 : redis에 topic을 만들고 pub/sub 통신을 하기 위해 리스너를 설정한다.
     * 서버 시작하자마자 모든 채팅방 토픽 생성
     */
    public void enterChatRoom(String roomId) {
        ChannelTopic topic = topics.get(roomId);
        if (topic == null)
            topic = new ChannelTopic(roomId);
        redisMessageListener.addMessageListener(redisSubscriber, topic);
        topics.put(roomId, topic);
        // 이전 메시지 출력
//        List<ChatMessage> messages = chatMessageRepository.getChatMessagesByRoomId(roomId);
//        for (ChatMessage message: messages) {
//            redisPublisher.publish(topic, message);
//        }
    }

    // 1:1 대화 내역 보기
    @Override
    public List<ChatRoomsInterface> getChatRooms(Long memberSeq) {
        return chatRoomRepository.getChatRooms(memberSeq);
    }

    @Override
    public void deleteChatRoom(String roomId) {
        chatRoomRepository.deleteChatRoomByRoomId(roomId);
    }

    public ChannelTopic getTopic(String roomId) {
        return topics.get(roomId);
    }



}
