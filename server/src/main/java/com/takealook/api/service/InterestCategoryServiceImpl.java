package com.takealook.api.service;

import com.takealook.db.entity.InterestCategory;
import com.takealook.db.repository.InterestCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InterestCategoryServiceImpl implements InterestCategoryService{
    @Autowired
    InterestCategoryRepository interestCategoryRepository;

    @Override
    public InterestCategory createInterestCategory(Long memberSeq, Long categorySeq) {
        InterestCategory interestCategory = InterestCategory.builder()
                .memberSeq(memberSeq)
                .categorySeq(categorySeq)
                .build();
        interestCategoryRepository.save(interestCategory);
        return interestCategory;
    }

    @Override
    public List<InterestCategory> getInterestCategoryListByMemberSeq(Long memberSeq) {
        List<InterestCategory> interestCategoryList = interestCategoryRepository.findAllByMemberSeq(memberSeq);
        return interestCategoryList;
    }

    @Override
    public int deleteCategory(Long memberSeq, Long categorySeq) {
        int result = interestCategoryRepository.deleteByMemberSeqAndCategorySeq(memberSeq, categorySeq);
        return result;
    }
}
