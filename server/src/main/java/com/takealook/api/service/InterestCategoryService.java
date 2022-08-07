package com.takealook.api.service;

import com.takealook.db.entity.InterestCategory;

import java.util.List;

public interface InterestCategoryService {
    InterestCategory createInterestCategory(Long memberSeq, Long categorySeq);
    List<InterestCategory> getInterestCategoryListByMemberSeq(Long memberSeq);
    int deleteCategory(Long memberSeq, Long categorySeq);
}
