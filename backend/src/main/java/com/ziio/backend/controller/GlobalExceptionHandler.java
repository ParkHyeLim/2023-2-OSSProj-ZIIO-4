package com.ziio.backend.controller;

import com.ziio.backend.exception.TokenExceptionHandler;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private final TokenExceptionHandler tokenExceptionHandler;
    @Autowired
    public GlobalExceptionHandler(TokenExceptionHandler tokenExceptionHandler) {
        this.tokenExceptionHandler = tokenExceptionHandler;
    }
    // 만료된 토큰 에러를 다루는 핸들러
    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<String> handleExpiredToken(ExpiredJwtException e) {
        return tokenExceptionHandler.handleExpiredToken();
    }
}
