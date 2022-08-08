package com.takealook.api.service;

import com.takealook.db.entity.History;
import com.takealook.db.repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoryServiceImpl implements HistoryService{

    @Autowired
    HistoryRepository historyRepository;

    @Override
    public List<History> getHistoryListByMemberSeq(Long memberSeq, Pageable pageable, int salesPurchase) {
        List<History> historyList = historyRepository.findAllByMemberSeqOrderByStartTime(memberSeq, pageable);
        return historyList;
    }

    @Override
    public History getHistoryBySeq(Long historySeq) {
        History history = historyRepository.findBySeq(historySeq);
        return history;
    }

    @Override
    public History getPurchaseByProductSeq(Long productSeq) {
        History history = historyRepository.findByProductSeqAndSalesPurchase(productSeq, 1);
        return history;
    }


}
