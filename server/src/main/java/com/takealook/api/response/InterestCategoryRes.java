package com.takealook.api.response;

import com.takealook.db.entity.InterestCategory;
import com.takealook.db.entity.InterestKeyword;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * 회원 본인 관심 카테고리 조회 API ([GET] /api/interest/category) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("InterestCategoryResponse")
public class InterestCategoryRes {
    List<Long> interestCategoryList;

    public static InterestCategoryRes of(List<Long> interestCategoryList){
        InterestCategoryRes res = new InterestCategoryRes();
        res.setInterestCategoryList(interestCategoryList);
        return res;
    }
}
