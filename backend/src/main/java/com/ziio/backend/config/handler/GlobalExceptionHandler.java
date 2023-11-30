package com.ziio.backend.config.handler;

import com.ziio.backend.exception.DuplicateRecordException;
import com.ziio.backend.exception.NotFoundException;
import com.ziio.backend.exception.TokenException;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.http.HttpStatus;

@RestControllerAdvice
public class GlobalExceptionHandler {
    private final TokenException tokenExceptionHandler;

    @Autowired
    public GlobalExceptionHandler(TokenException tokenExceptionHandler) {
        this.tokenExceptionHandler = tokenExceptionHandler;
    }

    // 만료된 토큰 에러를 다루는 핸들러
    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<String> handleExpiredToken(ExpiredJwtException e) {
        return tokenExceptionHandler.toExpiredTokenResponse();
    }

    // 중복된 데이터 저장 에러를 다루는 핸들러
    @ExceptionHandler(DuplicateRecordException.class)
    public ResponseEntity<String> handleDuplicateRecordException(DuplicateRecordException ex) {
        return ex.toDuplicateRecordResponse();
    }

    // 데이터가 없을 때의 에러를 다루는 핸들러
    @ExceptionHandler(NotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ResponseEntity<String> handleNotFoundException(NotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
