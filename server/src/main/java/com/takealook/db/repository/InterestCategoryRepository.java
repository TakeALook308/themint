package com.takealook.db.repository;

import com.takealook.db.entity.InterestCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface InterestCategoryRepository extends JpaRepository<InterestCategory, Long> {
    InterestCategory findByMemberSeqAndCategorySeq(Long memberSeq, Long categorySeq);
    List<InterestCategory> findAllByMemberSeq(Long memberSeq);
    @Transactional // update, delete 필수
    @Modifying(clearAutomatically = true) // 영속성 컨텍스트 초기화
    int deleteByMemberSeqAndCategorySeq(Long memberSeq, Long categorySeq);
}
