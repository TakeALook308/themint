package com.takealook.db.repository;

import com.takealook.db.entity.Member;
import com.takealook.db.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository  extends JpaRepository<Product, Long> {
    public Optional<List<Product>> findByAuctionSeq(Long auctionSeq);
}
