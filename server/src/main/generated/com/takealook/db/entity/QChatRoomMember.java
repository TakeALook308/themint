package com.takealook.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QChatRoomMember is a Querydsl query type for ChatRoomMember
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChatRoomMember extends EntityPathBase<ChatRoomMember> {

    private static final long serialVersionUID = -700044694L;

    public static final QChatRoomMember chatRoomMember = new QChatRoomMember("chatRoomMember");

    public final NumberPath<Long> memberSeq = createNumber("memberSeq", Long.class);

    public final StringPath roomId = createString("roomId");

    public final NumberPath<Long> seq = createNumber("seq", Long.class);

    public QChatRoomMember(String variable) {
        super(ChatRoomMember.class, forVariable(variable));
    }

    public QChatRoomMember(Path<? extends ChatRoomMember> path) {
        super(path.getType(), path.getMetadata());
    }

    public QChatRoomMember(PathMetadata metadata) {
        super(ChatRoomMember.class, metadata);
    }

}

