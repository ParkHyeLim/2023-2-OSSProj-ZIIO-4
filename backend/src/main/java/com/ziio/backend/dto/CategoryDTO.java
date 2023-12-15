package com.ziio.backend.dto;

import lombok.Builder;
import lombok.Getter;

public class CategoryDTO {
    @Getter
    @Builder
    public static class Info {
        private String category_id;
        private String name;
        private String top_fixed;
    }
}
