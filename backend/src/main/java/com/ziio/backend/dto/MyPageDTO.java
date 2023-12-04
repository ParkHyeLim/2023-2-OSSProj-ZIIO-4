package com.ziio.backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class MyPageDTO {

    @Getter
    @Builder
    public static class Info {
        private Long my_page_id;
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
    @Getter
    @Setter
    public static class Request {
        private Long my_page_id;
        private String start_date;
        private String end_date;
        private String title;
        private String url;
        private String color_code;
        private String memo;
    }
}