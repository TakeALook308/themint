package com.takealook.db.repository;

import com.takealook.db.entity.InterestCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface InterestCategoryRepository extends JpaRepository<InterestCategory, Long> {
    List<InterestCategory> findAllByMemberSeq(Long memberSeq);
    @Transactional
    int deleteByMemberSeqAndCategorySeq(Long memberSeq, Long categorySeq);
}
