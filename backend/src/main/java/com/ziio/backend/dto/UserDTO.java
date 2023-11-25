package com.ziio.backend.dto;

import lombok.Builder;
import lombok.Getter;
import org.springframework.security.oauth2.core.OAuth2AccessToken;

public class UserDTO {

    @Getter
    @Builder
    public static class Info {
        private String email;
        private String name;
        private OAuth2AccessToken accessToken;
    }
}