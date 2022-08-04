package com.takealook.db.repository;

import com.takealook.db.entity.Member;
import com.takealook.db.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository  extends JpaRepository<Product, Long> {
    Optional<List<Product>> findByAuctionSeq(Long auctionSeq);
    @Transactional
    void deleteAllByAuctionSeq(Long auctionSeq);
}
