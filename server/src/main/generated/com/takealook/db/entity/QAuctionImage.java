package com.takealook.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QAuctionImage is a Querydsl query type for AuctionImage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QAuctionImage extends EntityPathBase<AuctionImage> {

    private static final long serialVersionUID = -1910345291L;

    public static final QAuctionImage auctionImage = new QAuctionImage("auctionImage");

    public final NumberPath<Long> auctionSeq = createNumber("auctionSeq", Long.class);

    public final StringPath imageUrl = createString("imageUrl");

    public final NumberPath<Long> seq = createNumber("seq", Long.class);

    public QAuctionImage(String variable) {
        super(AuctionImage.class, forVariable(variable));
    }

    public QAuctionImage(Path<? extends AuctionImage> path) {
        super(path.getType(), path.getMetadata());
    }

    public QAuctionImage(PathMetadata metadata) {
        super(AuctionImage.class, metadata);
    }

}

