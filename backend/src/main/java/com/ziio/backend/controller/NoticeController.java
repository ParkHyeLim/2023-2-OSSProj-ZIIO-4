package com.ziio.backend.controller;

import com.ziio.backend.entity.Category;
import com.ziio.backend.entity.Notice;
import com.ziio.backend.service.CategoryService;
import com.ziio.backend.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notices")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;
    @Autowired
    private CategoryService categoryService;

    // 모든 공지사항을 반환하는 메소드(= 공지사항 첫 화면)
    @GetMapping
    public ResponseEntity<Map<String, Object>> getAllNotices() {
        List<Notice> notices = noticeService.getAllNotices();
        List<Category> categories = categoryService.getAllCategories();

        Map<String, Object> response = new HashMap<>();
        response.put("notices", notices);
        response.put("categories", categories);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    // 부모 카테고리 id와 키워드를 포함하는 공지사항을 반환하는 메소드
    @GetMapping("/search/{category_id}/{keyword}")
    public ResponseEntity<List<Notice>> searchNoticesByCategoryIdAndKeyword(
            @PathVariable("category_id") String categoryId,
            @PathVariable("keyword") String keyword
    ){
        List<Notice> notices = noticeService.getNoticesByCategoryIdAndKeyword(categoryId, keyword);

        return new ResponseEntity<>(notices, HttpStatus.OK);
    }
}
