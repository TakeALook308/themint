package com.takealook.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QMember is a Querydsl query type for Member
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QMember extends EntityPathBase<Member> {

    private static final long serialVersionUID = -1823811273L;

    public static final QMember member = new QMember("member1");

    public final QBaseEntity _super = new QBaseEntity(this);

    public final StringPath accountNo = createString("accountNo");

    public final StringPath address = createString("address");

    public final NumberPath<Integer> bankCode = createNumber("bankCode", Integer.class);

    public final StringPath email = createString("email");

    //inherited
    public final NumberPath<Long> id = _super.id;

    public final StringPath memberId = createString("memberId");

    public final StringPath memberName = createString("memberName");

    public final NumberPath<Integer> mileage = createNumber("mileage", Integer.class);

    public final StringPath nickname = createString("nickname");

    public final NumberPath<Integer> noticeEmail = createNumber("noticeEmail", Integer.class);

    public final NumberPath<Integer> noticeKakao = createNumber("noticeKakao", Integer.class);

    public final StringPath phone = createString("phone");

    public final StringPath profileUrl = createString("profileUrl");

    public final StringPath pwd = createString("pwd");

    public final NumberPath<Integer> score = createNumber("score", Integer.class);

    public QMember(String variable) {
        super(Member.class, forVariable(variable));
    }

    public QMember(Path<? extends Member> path) {
        super(path.getType(), path.getMetadata());
    }

    public QMember(PathMetadata metadata) {
        super(Member.class, metadata);
    }

}

