package com.takealook.common.exception.member;

import com.takealook.common.exception.code.ErrorCode;
import lombok.Getter;

@Getter
public class MemberIdDuplicateException extends RuntimeException{
    private ErrorCode errorCode;

    public MemberIdDuplicateException(String message, ErrorCode errorCode){
        super(message);
        this.errorCode = errorCode;
    }
}
