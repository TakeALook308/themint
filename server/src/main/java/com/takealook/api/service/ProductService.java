package com.takealook.api.service;

import com.takealook.db.entity.Product;

import java.util.List;

public interface ProductService {
    List<Product> getProductListByAuctionSeq(Long auctionSeq);
}
