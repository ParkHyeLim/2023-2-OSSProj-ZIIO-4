package com.ziio.backend.controller;

import com.ziio.backend.dto.MyPageDTO;
import com.ziio.backend.entity.MyPage;
import com.ziio.backend.service.MyPageService;
import com.ziio.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/mypages")
public class MyPageController {

    @Autowired
    private MyPageService myPageService;
    @Autowired
    private JwtUtil jwtUtil;

    // 사용자의 모든 마이페이지 일정을 반환하는 메소드(= 마이페이지 첫 화면)
    @GetMapping
    public ResponseEntity<List<MyPage>> getAllMyPages(
            @RequestHeader("Authorization") String authorizationHeader) {

        // 토큰에서 유저 이메일 가져오기
        String jwtToken = jwtUtil.getJwtTokenFromHeader(authorizationHeader);
        String userEmail = jwtUtil.getEmailFromToken(jwtToken);

        List<MyPage> myPages = myPageService.getAllMyPagesByUserEmail(userEmail);

        return new ResponseEntity<>(myPages, HttpStatus.OK);
    }

    // 사용자의 요청에 따라 일정을 수정하는 메소드
    @PatchMapping
    public ResponseEntity<MyPageDTO.Info> updateMyPage(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody MyPageDTO.Request request) {

        // 토큰에서 유저 이메일 가져오기
        String jwtToken = jwtUtil.getJwtTokenFromHeader(authorizationHeader);
        String userEmail = jwtUtil.getEmailFromToken(jwtToken);

        // 마이페이지 id는 필수값
        if (request.getMy_page_id() == null) {
            throw new IllegalArgumentException("MyPage ID cannot be null.");
        }
        Long myPageId = request.getMy_page_id();

        // 마이페이지 일정 업데이트
        MyPage updatedMyPage = myPageService.updateMyPage(myPageId, request, userEmail);

        // 응답 객체 생성 및 반환
        MyPageDTO.Info updatedMyPageResponse = MyPageDTO.Info.builder()
                .my_page_id(myPageId)
                .notice_id(updatedMyPage.getNotice_id())
                .academic_id(updatedMyPage.getAcademic_id())
                .category_id(updatedMyPage.getCategory_id())
                .user_email(updatedMyPage.getUser_email())
                .start_date(updatedMyPage.getStart_date())
                .end_date(updatedMyPage.getEnd_date())
                .title(updatedMyPage.getTitle())
                .url(updatedMyPage.getUrl())
                .color_code(updatedMyPage.getColor_code())
                .memo(updatedMyPage.getMemo())
                .message("successfully updated.")
                .build();

        return new ResponseEntity<>(updatedMyPageResponse, HttpStatus.OK);
    }
}
