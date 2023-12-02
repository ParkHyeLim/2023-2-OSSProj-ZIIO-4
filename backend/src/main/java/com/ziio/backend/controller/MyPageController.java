package com.ziio.backend.controller;

import com.ziio.backend.entity.MyPage;
import com.ziio.backend.service.MyPageService;
import com.ziio.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
