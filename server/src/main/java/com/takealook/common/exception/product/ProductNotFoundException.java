package com.takealook.common.exception.product;

import com.takealook.common.exception.code.ErrorCode;
import lombok.Getter;

@Getter
public class ProductNotFoundException extends RuntimeException{
    private ErrorCode errorCode;

    public ProductNotFoundException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }
}
