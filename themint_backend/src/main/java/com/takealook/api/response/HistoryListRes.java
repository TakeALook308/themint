package com.takealook.api.response;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
public class HistoryListRes {
    Boolean hasMore;
    List<HistoryListEntityRes> resultList;

    public static HistoryListRes of(Boolean hasMore, List<HistoryListEntityRes> historyListEntityResList){
        HistoryListRes res = HistoryListRes.builder()
                .hasMore(hasMore)
                .resultList(historyListEntityResList)
                .build();
        return res;
    }
}
