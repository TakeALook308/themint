package com.takealook.api.service;

import com.takealook.common.exception.code.ErrorCode;
import com.takealook.common.exception.interest.InterestDuplicateException;
import com.takealook.db.entity.InterestCategory;
import com.takealook.db.repository.InterestCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class InterestCategoryServiceImpl implements InterestCategoryService{
    @Autowired
    InterestCategoryRepository interestCategoryRepository;

    @Override
    public void createInterestCategory(Long memberSeq, Long categorySeq) {
        InterestCategory check = interestCategoryRepository.findByMemberSeqAndCategorySeq(memberSeq, categorySeq);
        if(check != null){
            throw new InterestDuplicateException("interest category duplicated", ErrorCode.INTEREST_DUPLICATION);
        }
        InterestCategory interestCategory = InterestCategory.builder()
                .memberSeq(memberSeq)
                .categorySeq(categorySeq)
                .build();
        interestCategoryRepository.save(interestCategory);
    }

    @Override
    public List<Long> getInterestCategoryListByMemberSeq(Long memberSeq) {
        List<Long> list = new ArrayList<>();
        List<InterestCategory> interestCategoryList = interestCategoryRepository.findAllByMemberSeq(memberSeq);
        for (InterestCategory interestCategory : interestCategoryList){
            list.add(interestCategory.getCategorySeq());
        }
        return list;
    }

    @Override
    public void deleteCategory(Long memberSeq, Long categorySeq) {
        interestCategoryRepository.deleteByMemberSeqAndCategorySeq(memberSeq, categorySeq);
    }

    @Override
    public List<String> getMemberListByCategorySeq(Long categorySeq) {
        return interestCategoryRepository.getMemberListByCategorySeq(categorySeq);
    }
}
