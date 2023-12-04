package com.ziio.backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class BookMarkDTO {
    @Getter
    @Builder
    public static class Info {
        private String user_email;
        private String category_id;
        private String category_name;
        private String message;
    }

    @Getter
    @Setter
    public static class Request {
        private String category_id;
    }
}
