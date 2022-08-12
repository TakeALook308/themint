package com.takealook.common.exception.auction;

import com.takealook.common.exception.code.ErrorCode;
import lombok.Getter;

@Getter
public class AuctionNotFoundException extends RuntimeException{
    private ErrorCode errorCode;

    public AuctionNotFoundException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }
}
