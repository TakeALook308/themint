package com.takealook.api.controller;

import com.takealook.common.exception.auction.AuctionNotFoundException;
import com.takealook.common.exception.code.ErrorCode;
import com.takealook.common.exception.interest.InterestDuplicateException;
import com.takealook.common.exception.member.*;
import com.takealook.common.exception.product.ProductNotFoundException;
import com.takealook.common.exception.response.ErrorResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class GlobalControllerAdvice {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(Exception e){
        log.error("handleException",e);
        ErrorResponse response = new ErrorResponse(ErrorCode.INTER_SERVER_ERROR);
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // 관심
    @ExceptionHandler(InterestDuplicateException.class)
    public ResponseEntity<ErrorResponse> handleInterestDuplicateException(InterestDuplicateException e){
        log.error("handleInterestDuplicateException", e);
        ErrorResponse response = new ErrorResponse(e.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

    // 경매
    @ExceptionHandler(AuctionNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleAuctionNotFoundException(AuctionNotFoundException e){
        log.error("handleAuctionNotFoundException", e);
        ErrorResponse response = new ErrorResponse(e.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

    // 물품
    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleProductNotFoundException(ProductNotFoundException e){
        log.error("handleProductNotFoundException", e);
        ErrorResponse response = new ErrorResponse(e.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

    // 멤버
    @ExceptionHandler(MemberIdDuplicateException.class)
    public ResponseEntity<ErrorResponse> handleMemberIdDuplicateException(MemberIdDuplicateException e){
        log.error("handleMemberIdDuplicateException", e);
        ErrorResponse response = new ErrorResponse(e.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

    @ExceptionHandler(NicknameDuplicateException.class)
    public ResponseEntity<ErrorResponse> handleNicknameDuplicateException(NicknameDuplicateException e){
        log.error("handleNicknameDuplicateException", e);
        ErrorResponse response = new ErrorResponse(e.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

    @ExceptionHandler(PhoneDuplicateException.class)
    public ResponseEntity<ErrorResponse> handlePhoneDuplicateException(PhoneDuplicateException e){
        log.error("handlePhoneDuplicateException", e);
        ErrorResponse response = new ErrorResponse(e.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

    @ExceptionHandler(EmailDuplicateException.class)
    public ResponseEntity<ErrorResponse> handleEmailDuplicateException(EmailDuplicateException e){
        log.error("handleEmailDuplicateException", e);
        ErrorResponse response = new ErrorResponse(e.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }

    // 판매내역, 구매내역
    @ExceptionHandler(MemberNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleMemberNotFoundException(MemberNotFoundException e){
        log.error("handleMemberNotFoundException", e);
        ErrorResponse response = new ErrorResponse(e.getErrorCode());
        return new ResponseEntity<>(response, HttpStatus.valueOf(e.getErrorCode().getStatus()));
    }
}
