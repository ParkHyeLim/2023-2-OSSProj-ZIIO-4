package com.ziio.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

@Component
public class TokenException {

    public ResponseEntity<String> toExpiredTokenResponse() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body("Token has expired");
    }
}
