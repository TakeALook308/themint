package com.takealook.api.service;

import com.takealook.db.entity.Product;
import com.takealook.db.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.data.domain.Pageable;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService{

    @Autowired
    ProductRepository productRepository;

    @Override
    public List<Product> getProductList(String word, Pageable pageable) {
        List<Product> productList = productRepository.findAllByProductNameContains(word, pageable);
        return null;
    }

    @Override
    public List<Product> getProductListOrderByScore(String word, Pageable pageable) {
        return null;
    }

    @Override
    public List<Product> getProductListByAuctionSeq(Long auctionSeq) {
        List<Product> productList = productRepository.findByAuctionSeq(auctionSeq).orElse(null);
        return productList;
    }

    @Override
    public void updateProductList(Long auctionSeq, List<Product> productList) {
        productRepository.deleteAllByAuctionSeq(auctionSeq);
        for(Product product : productList){
            if(product.getSeq() != 0){
                productRepository.save(product);
            } else{
                Product newProduct = Product.builder()
                        .auctionSeq(product.getAuctionSeq())
                        .productName(product.getProductName())
                        .startPrice(product.getStartPrice())
                        .status(0)
                        .build();
                productRepository.save(newProduct);
            }
        }
    }

    @Override
    public void deleteProductList(Long auctionSeq) {
        productRepository.deleteAllByAuctionSeq(auctionSeq);
    }
}
