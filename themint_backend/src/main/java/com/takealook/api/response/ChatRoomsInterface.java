package com.takealook.api.response;

// native Query 값 불러오기 위해 Dto 대신 Interface 사용
public interface ChatRoomsInterface {
    String getRoomId();
    Long getMemberSeq();
    String getNickname();
    String getProfileUrl();
//    String getLastChat();
}
