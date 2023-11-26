package com.ziio.backend.dto;

import lombok.Builder;
import lombok.Getter;

public class UserDTO {

    @Getter
    @Builder
    public static class Info {
        private String email;
        private String name;
        private String accessToken;
    }
}