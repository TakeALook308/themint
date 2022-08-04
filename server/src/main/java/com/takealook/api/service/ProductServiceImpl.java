package com.takealook.api.service;

import com.takealook.db.entity.Product;
import com.takealook.db.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    ProductRepository productRepository;

    @Override
    public List<Product> getProductListByAuctionSeq(Long auctionSeq) {
        List<Product> productList = productRepository.findByAuctionSeq(auctionSeq).orElse(null);
        return productList;
    }
}
