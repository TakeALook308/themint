package com.takealook.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class MemberListRes {
    Boolean hasMore;
    List<MemberListEntityRes> resultList;

    public static MemberListRes of(List<MemberListEntityRes> memberListEntityResList, Boolean hasMore){
        MemberListRes res = MemberListRes.builder()
                .hasMore(hasMore)
                .resultList(memberListEntityResList)
                .build();
        return res;
    }
}
