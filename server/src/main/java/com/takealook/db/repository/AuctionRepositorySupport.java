package com.takealook.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.takealook.db.entity.Auction;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Repository;

import javax.persistence.TypedQuery;
import java.awt.print.Pageable;

@Repository
public class AuctionRepositorySupport {
    @Autowired
    JPAQueryFactory jpaQueryFactory;

//    public Page<Auction> findAllByTitleAndContent(String word, Pageable pageable){
//        TypedQuery<Auction> query =
//    }
}
