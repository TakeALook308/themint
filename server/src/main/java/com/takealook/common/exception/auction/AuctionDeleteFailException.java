package com.takealook.common.exception.auction;

import com.takealook.common.exception.code.ErrorCode;
import lombok.Getter;

@Getter
public class AuctionDeleteFailException extends RuntimeException{
    private ErrorCode errorCode;

    public AuctionDeleteFailException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }
}
