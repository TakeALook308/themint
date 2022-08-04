package com.takealook.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QAuction is a Querydsl query type for Auction
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAuction extends EntityPathBase<Auction> {

    private static final long serialVersionUID = 1980654406L;

    public static final QAuction auction = new QAuction("auction");

    public final NumberPath<Long> categorySeq = createNumber("categorySeq", Long.class);

    public final StringPath content = createString("content");

    public final StringPath link = createString("link");

    public final NumberPath<Long> memberSeq = createNumber("memberSeq", Long.class);

    public final NumberPath<Long> seq = createNumber("seq", Long.class);

    public final StringPath startTime = createString("startTime");

    public final StringPath title = createString("title");

    public QAuction(String variable) {
        super(Auction.class, forVariable(variable));
    }

    public QAuction(Path<? extends Auction> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAuction(PathMetadata metadata) {
        super(Auction.class, metadata);
    }

}

