package com.takealook.api.service;

import com.takealook.db.entity.InterestCategory;

import java.util.List;

public interface InterestCategoryService {
    void createInterestCategory(Long memberSeq, Long categorySeq);
    List<Long> getInterestCategoryListByMemberSeq(Long memberSeq);
    void deleteCategory(Long memberSeq, Long categorySeq);

    List<String> getMemberListByCategorySeq(Long categorySeq);
}
