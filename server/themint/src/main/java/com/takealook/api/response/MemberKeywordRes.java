package com.takealook.api.response;

import com.takealook.db.entity.Member;
import com.takealook.db.entity.MemberKeyword;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * 회원 본인 관심 키워드 조회 API ([GET] /api/keyword) 요청에 대한 응답값 정의.
 */
@Getter
@Setter
@ApiModel("KeywordResponse")
public class MemberKeywordRes {
    @ApiModelProperty(name="Member Keyword")
    List<MemberKeyword> memberKeywordList;

    public static MemberKeywordRes of(List<MemberKeyword> memberKeywordList){
        MemberKeywordRes res = new MemberKeywordRes();
        res.setMemberKeywordList(memberKeywordList);
        return res;
    }
}