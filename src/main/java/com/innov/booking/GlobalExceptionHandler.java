package com.innov.booking;

import com.innov.constant.HttpStatusCode;
import com.innov.dto.GeneralResponse;
import com.innov.booking.GeneralException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;
import com.innov.constant.ErrorCode;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler({GeneralException.class})
    public ResponseEntity<Map<String, Object>> handleGeneralException(GeneralException ex){
        HttpStatus httpStatus = null;
        switch (ex.getErrorCode()) {
            case USER_ALREADY_EXISTS:
                httpStatus = HttpStatus.OK;
                break;
            case INTERNAL_ERROR:
                httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
                break;
            case USER_NOT_FOUND:
                httpStatus = HttpStatus.NOT_FOUND;
                break;
            case INVALID_INPUT:
                httpStatus = HttpStatus.UNAUTHORIZED;
                break;
            case UNABLE_SAVE:
                httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;;
                break;
            default:
                httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return ResponseEntity.status(httpStatus).body(Map.of("error", ex.getErrorCode(), "errorMessage", ex.getMessage()));
    }

    // Handle other generic exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<GeneralResponse> handleGeneric(Exception ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new GeneralResponse(false, "An error occurred: " + ex.getMessage()));
    }
}