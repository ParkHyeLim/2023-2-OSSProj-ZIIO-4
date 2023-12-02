package com.ziio.backend.controller;

import com.ziio.backend.dto.BookMarkDTO;
import com.ziio.backend.entity.Category;
import com.ziio.backend.service.BookMarkService;
import com.ziio.backend.service.CategoryService;
import com.ziio.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/bookmarks")
public class BookMarkController {

    @Autowired
    CategoryService categoryService;
    @Autowired
    BookMarkService bookMarkService;
    @Autowired
    private JwtUtil jwtUtil;

    // 특정 카테고리를 즐겨찾기에 등록하는 메소드
    @PostMapping
    public ResponseEntity<BookMarkDTO.Info> addCategoryToBookMark(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody BookMarkDTO.Request request) {

        // 카테고리 아이디
        String categoryId = request.getCategory_id();
        Category category = categoryService.getCategoryByCategoryId(categoryId);

        // 토큰에서 유저 이메일 가져오기
        String jwtToken = jwtUtil.getJwtTokenFromHeader(authorizationHeader);
        String userEmail = jwtUtil.getEmailFromToken(jwtToken);

        // 북마크에 추가
        bookMarkService.addCategoryToBookMark(userEmail, category);

        // 응답 객체 생성 및 반환
        BookMarkDTO.Info bookMarkInfo = BookMarkDTO.Info.builder()
                .user_email(userEmail)
                .category_id(categoryId)
                .category_name(category.getName())
                .message("successfully created.")
                .build();

        return new ResponseEntity<>(bookMarkInfo, HttpStatus.CREATED);
    }

    // 특정 카테고리를 즐겨찾기에서 삭제하는 메소드
    @DeleteMapping
    public ResponseEntity<Map<String, String>> removeCategoryFromBookMark(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody BookMarkDTO.Request request) {

        // 카테고리 아이디
        String categoryId = request.getCategory_id();
        Category category = categoryService.getCategoryByCategoryId(categoryId);

        // 토큰에서 유저 이메일 가져오기
        String jwtToken = jwtUtil.getJwtTokenFromHeader(authorizationHeader);
        String userEmail = jwtUtil.getEmailFromToken(jwtToken);

        // 북마크에서 삭제
        bookMarkService.removeCategoryFromBookMark(userEmail, categoryId);

        // 응답 객체 생성 및 반환
        Map<String, String> response = new HashMap<>();
        response.put("message", "successfully removed.");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
