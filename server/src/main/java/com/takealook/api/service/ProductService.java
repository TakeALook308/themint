package com.takealook.api.service;

import com.takealook.db.entity.Product;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface ProductService {
    List<Product> getProductList(String word, Pageable pageable);
    List<Product> getProductListOrderByScore(String word, Pageable pageable);
    List<Product> getProductListByAuctionSeq(Long auctionSeq);
    void updateProductList(Long auctionSeq, List<Product> productList);
    void deleteProductList(Long auctionSeq);
}
