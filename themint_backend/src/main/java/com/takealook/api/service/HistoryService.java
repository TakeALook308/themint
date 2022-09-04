package com.takealook.api.service;

import com.takealook.api.request.PurchaseRegisterPostReq;
import com.takealook.db.entity.History;
import com.takealook.db.entity.Product;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface HistoryService {
    List<History> getHistoryListByMemberSeq(Long memberSeq, Pageable pageable, int salesPurchase, int isSold);
    History getHistoryBySeq(Long historySeq);
    History getPurchaseByProductSeq(Long productSeq);
    History getSalesByProductSeq(Long productSeq);
    List<History> getHistoryByDateAndSalesPurchase();
    void deleteSalesHistory(List<Product> productList);
    int registerPurchaseHistory(PurchaseRegisterPostReq purchaseRegisterPostReq);
    int registerSalesHistory(Long memberSeq, List<Product> productList);
}
