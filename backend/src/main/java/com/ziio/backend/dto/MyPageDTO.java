package com.ziio.backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class MyPageDTO {

    @Getter
    @Builder
    public static class Info {
        private String user_email;
        private String start_date;
        private String end_date;
        private String title;
        private String color_code;
        private String url;
        private String memo;
        private Long academic_id;
        private String message;
    }

    @Getter
    @Setter
    public static class Request {
        private Long academic_id;
    }
}