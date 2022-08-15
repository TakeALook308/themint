package com.takealook.db.repository;

import com.takealook.db.entity.InterestAuction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface InterestAuctionRepository extends JpaRepository<InterestAuction, Long> {
    InterestAuction findByMemberSeqAndHash(Long memberSeq, String hash);
    List<InterestAuction> findAllByMemberSeq(Long memberSeq);
    @Transactional // update, delete 필수
    @Modifying(clearAutomatically = true) // 영속성 컨텍스트 초기화
    int deleteByMemberSeqAndHash(Long memberSeq, String hash);
}
