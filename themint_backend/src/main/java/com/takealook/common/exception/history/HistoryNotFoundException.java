package com.takealook.common.exception.history;

import com.takealook.common.exception.code.ErrorCode;
import lombok.Getter;

@Getter
public class HistoryNotFoundException extends RuntimeException{
    private ErrorCode errorCode;

    public HistoryNotFoundException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }
}
