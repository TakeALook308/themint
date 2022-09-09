package com.takealook.api.service;

import com.takealook.api.request.PurchaseRegisterPostReq;
import com.takealook.common.exception.code.ErrorCode;
import com.takealook.common.exception.history.HistoryNotFoundException;
import com.takealook.db.entity.History;
import com.takealook.db.entity.Product;
import com.takealook.db.repository.HistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class HistoryServiceImpl implements HistoryService {

    @Autowired
    HistoryRepository historyRepository;

    @Override
    public List<History> getHistoryListByMemberSeq(Long memberSeq, Pageable pageable, int salesPurchase, int isSold) {
        List<History> historyList = null;
        if (salesPurchase == 0) { // 판매 내역
            if(isSold == 0) { // product status : 0, 1, 2
                historyList = historyRepository.findSalesByMemberSeqAndStatusSmallerOrderByStartTime(memberSeq, 2, pageable);
            } else{
                historyList = historyRepository.findSalesByMemberSeqAndStatusBiggerOrderByStartTime(memberSeq, 3, pageable);
            }
        } else { // 구매 내역
            if(isSold == 0){ // product status : 0, 1, 2
                historyList = historyRepository.findPurchaseByMemberSeqAndStatusSmallerOrderBySeq(memberSeq, 2, pageable);
            } else {
                historyList = historyRepository.findPurchaseByMemberSeqAndStatusBiggerOrderBySeq(memberSeq, 3, pageable);
            }
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
        if (history == null) {
            throw new HistoryNotFoundException("purchase history not found", ErrorCode.HISTORY_NOT_FOUND);
        }
        return history;
    }

    @Override
    public History getSalesByProductSeq(Long productSeq) {
        History history = historyRepository.findByProductSeqAndSalesPurchase(productSeq, 0);
        if (history == null) {
            throw new HistoryNotFoundException("sales history not found", ErrorCode.HISTORY_NOT_FOUND);
        }
        return history;
    }

    @Override
    public List<History> getHistoryByDateAndSalesPurchase() {
        String minTime = LocalDateTime.now().minusDays(7).minusHours(2).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
        String maxTime = LocalDateTime.now().minusDays(7).format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));

        List<History> historyList = historyRepository.findAllByDateAfterAndDateBeforeAndSalesPurchase(minTime, maxTime, 1);
        return historyList;
    }

    @Override
    public void deleteSalesHistory(List<Product> productList) {
        for (Product product : productList) {
            historyRepository.deleteByProductSeqAndSalesPurchase(product.getSeq(), 0);
        }
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
                    .date(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                    .build());
        } else {
            historyRepository.save(History.builder()
                    .memberSeq(purchaseRegisterPostReq.getMemberSeq())
                    .productSeq(purchaseRegisterPostReq.getProductSeq())
                    .salesPurchase(1)
                    .date(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                    .build());
        }
        return 1;
    }

    @Override
    public int registerSalesHistory(Long memberSeq, List<Product> productList) {
        for (Product product : productList) {
            historyRepository.save(History.builder()
                    .memberSeq(memberSeq)
                    .productSeq(product.getSeq())
                    .salesPurchase(0)
                    .date(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                    .build());
        }
        return 1;
    }


}
