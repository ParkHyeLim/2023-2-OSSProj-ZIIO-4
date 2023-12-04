package com.ziio.backend.controller;

import com.ziio.backend.dto.MyPageDTO;
import com.ziio.backend.dto.NoticeDTO;
import com.ziio.backend.entity.Notice;
import com.ziio.backend.service.AcademicService;
import com.ziio.backend.service.MyPageService;
import com.ziio.backend.service.NoticeService;
import com.ziio.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/scraps")
public class ScrapController {

    @Autowired
    private NoticeService noticeService;
    @Autowired
    private AcademicService academicService;
    @Autowired
    private MyPageService myPageService;
    @Autowired
    private JwtUtil jwtUtil;

    // 특정 사용자의 스크랩 목록에서 id만을 반환하는 메소드
    @GetMapping
    public ResponseEntity <List<Map<String, Long>>> getUserScraps(
            @RequestHeader("Authorization") String authorizationHeader) {

        // 토큰에서 유저 이메일 가져오기
        String jwtToken = jwtUtil.getJwtTokenFromHeader(authorizationHeader);
        String userEmail = jwtUtil.getEmailFromToken(jwtToken);

        // 스크랩 목록
        List<Long> userScrapIds = myPageService.getScrapIdsByUserEmail(userEmail);

        // 응답 객체 생성 및 반환
        List<Map<String, Long>> response = new ArrayList<>();
        for (int i = 0; i < userScrapIds.size(); i++) {
            Map<String, Long> map = new HashMap<>();
            map.put("id", userScrapIds.get(i));
            response.add(map);
        }

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // 특정 공지사항을 스크랩(마이페이지에 추가)하는 메소드
    @PostMapping
    public ResponseEntity<MyPageDTO.Info> addNoticeToMyPage(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody NoticeDTO.Request request) {

        MyPageDTO.Info myPageInfo = null;

        // 공지사항, 카테고리, 학사일정 아이디
        Long noticeId = request.getNotice_id();
        String categoryId = request.getCategory_id();
        Long academicId = request.getAcademic_id();

        // 토큰에서 유저 이메일 가져오기
        String jwtToken = jwtUtil.getJwtTokenFromHeader(authorizationHeader);
        String userEmail = jwtUtil.getEmailFromToken(jwtToken);

        // 1) 공지사항인 경우
        if (academicId == null) {
            // 정보 가져오기
            Notice noticeInfo = noticeService.getNoticeByNoticeIdAndCategoryId(noticeId, categoryId);
            // 마이페이지에 추가
            long myPageId = myPageService.addNoticeToMyPage(noticeInfo, request, userEmail);
            // 응답 객체 생성 및 반환
            myPageInfo = MyPageDTO.Info.builder()
                    .my_page_id(myPageId)
                    .notice_id(noticeId)
                    .academic_id(null)
                    .category_id(noticeInfo.getCategory_id())
                    .user_email(userEmail)
                    .start_date(request.getStart_date())
                    .end_date(request.getEnd_date())
                    .title(noticeInfo.getTitle())
                    .url(noticeInfo.getUrl())
                    .color_code(request.getColor_code())
                    .memo(request.getMemo())
                    .message("successfully created.")
                    .build();
        }
        // 2) 학사일정인 경우
        else {
            // 정보 가져오기
            com.ziio.backend.entity.Academic academicInfo = academicService.getAcademicById(academicId);
            // 마이페이지에 추가
            long myPageId = myPageService.addAcademicToMyPage(academicInfo, request, userEmail);
            // 응답 객체 생성 및 반환
            myPageInfo = MyPageDTO.Info.builder()
                    .my_page_id(myPageId)
                    .notice_id(null)
                    .academic_id(academicId)
                    .user_email(userEmail)
                    .start_date(academicInfo.getStart_date())
                    .end_date(academicInfo.getEnd_date())
                    .title(request.getTitle() == null ? academicInfo.getTitle() : request.getTitle())
                    .color_code(request.getColor_code() == null ? academicInfo.getColor_code() : request.getColor_code())
                    .memo(request.getMemo())
                    .message("successfully created.")
                    .build();
        }

        return new ResponseEntity<>(myPageInfo, HttpStatus.CREATED);
    }

    // 특정 공지사항을 마이페이지에서 삭제하는 메소드
    @DeleteMapping
    public ResponseEntity<Map<String, String>> removeNoticeToMyPage(
            @RequestHeader("Authorization") String authorizationHeader,
            @RequestBody NoticeDTO.Request request) {

        // 공지사항, 카테고리, 학사일정 아이디
        Long noticeId = request.getNotice_id();
        String categoryId = request.getCategory_id();
        Long academicId = request.getAcademic_id();

        // 토큰에서 유저 이메일 가져오기
        String jwtToken = jwtUtil.getJwtTokenFromHeader(authorizationHeader);
        String userEmail = jwtUtil.getEmailFromToken(jwtToken);

        // 1) 공지사항인 경우
        if (academicId == null) {
            // 마이페이지에서 삭제
            myPageService.removeNoticeFromMyPage(noticeId, categoryId, userEmail);
        }
        // 2) 학사일정인 경우
        else {
            // 마이페이지에서 삭제
            myPageService.removeAcademicFromMyPage(academicId, userEmail);
        }

        // 응답 객체 생성 및 반환
        Map<String, String> response = new HashMap<>();
        response.put("message", "successfully removed.");

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
