package com.takealook.db.repository;

import com.takealook.db.entity.AuctionImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuctionImageRepository extends JpaRepository<AuctionImage, Long> {
}
