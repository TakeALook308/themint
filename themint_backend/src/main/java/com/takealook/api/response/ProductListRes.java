package com.takealook.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class ProductListRes {
    Boolean hasMore;
    List<ProductListEntityRes> resultList;

    public static ProductListRes of(Boolean hasMore, List<ProductListEntityRes> productListEntityResList){
        ProductListRes res = ProductListRes.builder()
                .hasMore(hasMore)
                .resultList(productListEntityResList)
                .build();
        return res;
    }
}
