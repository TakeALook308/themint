package com.takealook.api.service;

import com.takealook.api.request.PurchaseRegisterPostReq;
import com.takealook.db.entity.History;
import com.takealook.db.repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class HistoryServiceImpl implements HistoryService {

    @Autowired
    HistoryRepository historyRepository;

    @Override
    public List<History> getHistoryListByMemberSeq(Long memberSeq, Pageable pageable, int salesPurchase) {
        List<History> historyList = null;
        if (salesPurchase == 0) { // 판매 내역
            historyList = historyRepository.findSalesByMemberSeqOrderByStartTime(memberSeq, pageable);
        } else { // 구매 내역
            historyList = historyRepository.findPurchaseByMemberSeqOrderBySeq(memberSeq, pageable);
        }
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

    @Override
    public History getSalesByProductSeq(Long productSeq) {
        History history = historyRepository.findByProductSeqAndSalesPurchase(productSeq, 0);
        return history;
    }

    @Override
    public int registerPurchaseHistory(PurchaseRegisterPostReq purchaseRegisterPostReq) {
        History history = historyRepository.findByProductSeqAndSalesPurchase(purchaseRegisterPostReq.getProductSeq(), 1);
        if (history != null) {
            historyRepository.save(History.builder()
                    .seq(history.getSeq())
                    .memberSeq(purchaseRegisterPostReq.getMemberSeq())
                    .productSeq(purchaseRegisterPostReq.getProductSeq())
                    .salesPurchase(1)
                    .build());
        } else {
            historyRepository.save(History.builder()
                    .memberSeq(purchaseRegisterPostReq.getMemberSeq())
                    .productSeq(purchaseRegisterPostReq.getProductSeq())
                    .salesPurchase(1)
                    .build());
        }
        return 1;
    }


}
