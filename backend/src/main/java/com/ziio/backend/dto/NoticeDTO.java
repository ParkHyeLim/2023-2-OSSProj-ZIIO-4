package com.ziio.backend.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

public class NoticeDTO {
    @Getter
    @Setter
    public static class Request {
        private String notice_id;
        private String category_id;
        private Long academic_id;
        private String title;
        private String start_date;
        private String end_date;
        private String color_code;
        private String memo;
    }

    @Getter
    @Builder
    public static class Info {
        private String notice_id;
        private String category_id;
        private String title;
        private String url;
        private String date_posted;
        private String author;
    }
}
