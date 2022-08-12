package com.takealook.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ChatMessagesRes {
    String nickname;
    String message;
    String date;

    public static ChatMessagesRes of(String nickname, String message, String date) {
        ChatMessagesRes res = ChatMessagesRes.builder()
                .nickname(nickname)
                .message(message)
                .date(date)
                .build();
        return res;
    }
}
