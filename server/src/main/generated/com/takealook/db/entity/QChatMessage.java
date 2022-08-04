package com.takealook.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QChatMessage is a Querydsl query type for ChatMessage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChatMessage extends EntityPathBase<ChatMessage> {

    private static final long serialVersionUID = -171811566L;

    public static final QChatMessage chatMessage = new QChatMessage("chatMessage");

    public final StringPath date = createString("date");

    public final NumberPath<Long> memberSeq = createNumber("memberSeq", Long.class);

    public final StringPath message = createString("message");

    public final StringPath nickname = createString("nickname");

    public final StringPath roomId = createString("roomId");

    public final NumberPath<Long> seq = createNumber("seq", Long.class);

    public final EnumPath<ChatMessage.MessageType> type = createEnum("type", ChatMessage.MessageType.class);

    public QChatMessage(String variable) {
        super(ChatMessage.class, forVariable(variable));
    }

    public QChatMessage(Path<? extends ChatMessage> path) {
        super(path.getType(), path.getMetadata());
    }

    public QChatMessage(PathMetadata metadata) {
        super(ChatMessage.class, metadata);
    }

}

