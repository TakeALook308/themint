package com.takealook.db.repository;

import com.takealook.db.entity.AuctionImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface AuctionImageRepository extends JpaRepository<AuctionImage, Long> {
    AuctionImage findBySeq(Long auctionImageSeq);
    Optional<List<AuctionImage>> findByAuctionSeq(Long auctionSeq);

    List<AuctionImage> findAllByAuctionSeq(Long auctionSeq);
    @Transactional // update, delete 필수
    @Modifying(clearAutomatically = true) // 영속성 컨텍스트 초기화
    void deleteAllByAuctionSeq(Long auctionSeq);
}
