package com.ziio.backend.util;

import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class StringUtil {

    // 000을 제외한 카테고리 앞 부분만 추출하는 메소드
    public String createParentIdByCategoryId(String category_id) {
        StringBuilder parentId = new StringBuilder();
        for (int i = 0; i < category_id.length(); i+=3) {
            String oneCategory = category_id.substring(i,i+3);
            if (oneCategory.equals("000")) break;
            parentId.append(oneCategory);
        }

        return parentId.toString();
    }
}
