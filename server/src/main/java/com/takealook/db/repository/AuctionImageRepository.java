package com.takealook.db.repository;

import com.takealook.db.entity.AuctionImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface AuctionImageRepository extends JpaRepository<AuctionImage, Long> {
    Optional<List<AuctionImage>> findByAuctionSeq(Long auctionSeq);
    @Transactional
    void deleteAllByAuctionSeq(Long auctionSeq);
}
