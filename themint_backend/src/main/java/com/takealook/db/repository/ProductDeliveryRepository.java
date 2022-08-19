package com.takealook.db.repository;

import com.takealook.db.entity.ProductDelivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductDeliveryRepository extends JpaRepository<ProductDelivery, Long> {
    ProductDelivery findByProductSeq(Long productSeq);
    ProductDelivery findBySeq(Long productDeliverySeq);
    void deleteByProductSeq(Long productSeq);
}
