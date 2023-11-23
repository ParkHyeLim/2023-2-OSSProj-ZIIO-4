package com.ziio.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class DuplicateRecordException extends RuntimeException {
    public DuplicateRecordException(String message) {
        super(message);
    }

    //
    public ResponseEntity<String> toDuplicateRecordResponse() {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(getMessage());
    }
}
