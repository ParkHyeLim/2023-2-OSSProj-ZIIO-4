package com.ziio.backend.controller;

import com.ziio.backend.entity.Academic;
import com.ziio.backend.service.AcademicService;
import com.ziio.backend.service.MyPageService;
import com.ziio.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/academics")
public class AcademicController {

    @Autowired
    private AcademicService academicService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private MyPageService myPageService;

    // 모든 학사일정을 반환하는 메소드
    @GetMapping
    public ResponseEntity<List<Academic>> getAllAcademics() {
        List<Academic> academics = academicService.getAllAcademics();
        return new ResponseEntity<>(academics, HttpStatus.OK);
    }

    /* 특정 학사일정을 사용자의 마이페이지에 추가하는 메소드 (API를 통합하여 사용하지 않음)
    @PostMapping
    public ResponseEntity<MyPageDTO.Info> addAcademicToMyPage(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody AcademicDTO.Request request) {

        // 학사일정 정보 가져오기
        Long academicId = request.getAcademic_id();
        Academic academicInfo = academicService.getAcademicById(academicId);

        // 토큰에서 유저 이메일 가져오기
        String jwtToken = jwtUtil.getJwtTokenFromHeader(authorizationHeader);
        String userEmail = jwtUtil.getEmailFromToken(jwtToken);

        // 마이페이지에 추가
        myPageService.addAcademicToMyPage(academicInfo, userEmail);

        // 응답 객체 생성 및 반환
        MyPageDTO.Info myPageInfo = MyPageDTO.Info.builder()
                .academic_id(academicId)
                .user_email(userEmail)
                .start_date(academicInfo.getStart_date())
                .end_date(academicInfo.getEnd_date())
                .title(academicInfo.getTitle())
                .color_code(academicInfo.getColor_code())
                .message("successfully created.")
                .build();

        return new ResponseEntity<>(myPageInfo, HttpStatus.CREATED);
    }
     */
}


