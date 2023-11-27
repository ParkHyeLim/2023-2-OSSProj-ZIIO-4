package com.ziio.backend.dto;

import lombok.Getter;
import lombok.Setter;

public class NoticeDTO {
    @Getter
    @Setter
    public static class Request {
        private Long notice_id;
        private String start_date;
        private String end_date;
        private String color_code;
        private String memo;
    }
}
