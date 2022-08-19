package com.takealook.api.request;

import lombok.*;
import java.util.List;
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class SmsReq {

    private String type;
    private String contentType;
    private String countryCode;
    private String from;
    private String content;
    private List<MessagesReq> messages;
}
