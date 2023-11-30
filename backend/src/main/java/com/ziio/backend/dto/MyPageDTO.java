package com.ziio.backend.dto;

import lombok.Builder;
import lombok.Getter;

public class MyPageDTO {

    @Getter
    @Builder
    public static class Info {
        private Long notice_id;
        private Long academic_id;
        private String category_id;
        private String user_email;
        private String start_date;
        private String end_date;
        private String title;
        private String url;
        private String color_code;
        private String memo;
        private String message;
    }
}