package com.innov.booking;

import com.innov.constant.ErrorCode;
import org.springframework.http.HttpStatus;

public class GeneralException extends RuntimeException {

    private final ErrorCode errorCode;

    public GeneralException(ErrorCode errorCode, String message) {
        super(message);
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {return errorCode;}
}
