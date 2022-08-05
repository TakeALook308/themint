package com.takealook.db.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.Generated;
import com.querydsl.core.types.Path;


/**
 * QProduct is a Querydsl query type for Product
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QProduct extends EntityPathBase<Product> {

    private static final long serialVersionUID = -1961930254L;

    public static final QProduct product = new QProduct("product");

    public final NumberPath<Long> auctionSeq = createNumber("auctionSeq", Long.class);

    public final StringPath productName = createString("productName");

    public final NumberPath<Long> seq = createNumber("seq", Long.class);

    public final NumberPath<Integer> startPrice = createNumber("startPrice", Integer.class);

    public final NumberPath<Integer> status = createNumber("status", Integer.class);

    public QProduct(String variable) {
        super(Product.class, forVariable(variable));
    }

    public QProduct(Path<? extends Product> path) {
        super(path.getType(), path.getMetadata());
    }

    public QProduct(PathMetadata metadata) {
        super(Product.class, metadata);
    }

}

