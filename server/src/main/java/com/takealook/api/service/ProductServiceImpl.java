package com.takealook.api.service;

import com.takealook.common.exception.code.ErrorCode;
import com.takealook.common.exception.product.ProductNotFoundException;
import com.takealook.db.entity.Product;
import com.takealook.db.repository.AuctionRepository;
import com.takealook.db.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    ProductRepository productRepository;

    @Autowired
    AuctionRepository auctionRepository;

    @Override
    public Product getProductBySeq(Long productSeq) {
        Product product = productRepository.findBySeq(productSeq);
        return product;
    }

    @Override
    public List<Product> getProductList(String word, Pageable pageable, String sort) { // 최신등록순, 경매임박순, 인기순, 낮은가격순
        String currentTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        if (word == null) {
            word = "";
        }
        List<Product> productList = null;
        if (sort.equals("startPrice")) { // 낮은가격순
            Pageable sortPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(sort).ascending());
            productList = productRepository.findAllByProductNameContainsAndStartTimeAfter(word, currentTime, sortPageable);
        } else if (sort.equals("startTime")) { // 경매임박순
            productList = productRepository.findAllByProductNameContainsAndStartTimeAfterOrderByStartTime(word, currentTime, pageable);
        } else if (sort.equals("auctionSeq")) { // 최신등록순
            Pageable sortPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), Sort.by(sort).descending());
            productList = productRepository.findAllByProductNameContainsAndStartTimeAfterOrderByAuctionSeq(word, currentTime, sortPageable);
        } else { // 인기순
            productList = productRepository.findAllByProductNameContainsAndStartTimeAfterOrderByInterest(word, currentTime, pageable);
        }
        return productList;
    }

    @Override
    public List<Product> getProductListOrderByScore(String word, Pageable pageable) {
        String currentTime = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        if (word == null) {
            word = "";
        }
        List<Product> productList = productRepository.findAllByProductNameContainsAndStartTimeAfterOrderByScore(word, currentTime, pageable);
        return productList;
    }

    @Override
    public List<Product> getProductListByAuctionSeq(Long auctionSeq) {
        List<Product> productList = productRepository.findByAuctionSeq(auctionSeq).orElse(null);
        return productList;
    }

    @Override
    public void updateStatus(Long productSeq, int status) {
        Product product = productRepository.findBySeq(productSeq);
        if(product == null){
            throw new ProductNotFoundException("product with seq " + productSeq + " not found", ErrorCode.PRODUCT_NOT_FOUND);
        }
        productRepository.save(Product.builder()
                .seq(productSeq)
                .auctionSeq(product.getAuctionSeq())
                .productName(product.getProductName())
                .startPrice(product.getStartPrice())
                .finalPrice(product.getFinalPrice())
                .status(status)
                .build());
    }

    @Override
    public void updateFinalPrice(Long productSeq, int finalPrice) {
        Product product = productRepository.findBySeq(productSeq);
        if(product == null){
            throw new ProductNotFoundException("product with seq " + productSeq + " not found", ErrorCode.PRODUCT_NOT_FOUND);
        }
        productRepository.save(Product.builder()
                .seq(productSeq)
                .auctionSeq(product.getAuctionSeq())
                .productName(product.getProductName())
                .startPrice(product.getStartPrice())
                .finalPrice(finalPrice)
                .status(product.getStatus())
                .build());
    }

    @Override
    public void updateProductList(Long auctionSeq, List<Product> productList) {
        productRepository.deleteAllByAuctionSeq(auctionSeq);
        for (Product product : productList) {
            if (product.getSeq() != null || product.getSeq() != 0) {
                productRepository.save(product);
            } else {
                Product newProduct = Product.builder()
                        .auctionSeq(product.getAuctionSeq())
                        .productName(product.getProductName())
                        .startPrice(product.getStartPrice())
                        .finalPrice(product.getFinalPrice())
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
