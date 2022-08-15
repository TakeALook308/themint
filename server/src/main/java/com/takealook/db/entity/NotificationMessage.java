package com.takealook.db.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class NotificationMessage {
    String memberId;
    String title;
    String url;
    String notification;
}
