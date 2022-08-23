package com.takealook.db.repository;

import com.takealook.db.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findAllByReceiverSeqOrderByDateDesc(Long memberSeq);
    Optional<Review> findByReceiverSeqAndProductSeq(Long memberseq, Long productSeq);
}
