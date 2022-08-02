package com.takealook.db.repository;

import com.querydsl.jpa.impl.JPAQueryFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AuctionRepositorySupport {
    @Autowired
    JPAQueryFactory jpaQueryFactory;


}
