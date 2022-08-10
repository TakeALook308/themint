package com.takealook.api.response;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * 회원 본인 관심 키워드 조회 API ([GET] /api/interest/keyword) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("InterestKeywordResponse")
public class InterestKeywordRes {
    List<String> interestKeywordList;

    public static InterestKeywordRes of(List<String> interestKeywordList){
        InterestKeywordRes res = new InterestKeywordRes();
        res.setInterestKeywordList(interestKeywordList);
        return res;
    }
}