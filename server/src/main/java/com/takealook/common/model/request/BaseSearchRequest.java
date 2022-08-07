package com.takealook.common.model.request;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

/**
 * 검색 기능에 대한 기본 검색 조건 정의.
 */
@Getter
@Setter
@Builder
@ApiModel("BaseSearchRequest")
public class BaseSearchRequest {
    String word = null;
    String key = "date"; // 최신순: date, 인기순: interest, 낮은가격순: price, 판매자신뢰도순: score
    int category = 0; // 기본 설정 : 카테고리 지정 안돼있음. 카테고리 값은 1부터 시작.
    int pageno = 1;
}
