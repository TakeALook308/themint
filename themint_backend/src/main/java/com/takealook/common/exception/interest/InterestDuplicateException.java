package com.takealook.common.exception.interest;

import com.takealook.common.exception.code.ErrorCode;
import lombok.Getter;

@Getter
public class InterestDuplicateException extends RuntimeException{

    private ErrorCode errorCode;

    public InterestDuplicateException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }
}
