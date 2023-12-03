package com.ziio.backend.controller;

import com.ziio.backend.dto.MyPageDTO;
import com.ziio.backend.dto.NoticeDTO;
import com.ziio.backend.entity.Academic;
import com.ziio.backend.entity.Category;
import com.ziio.backend.entity.Notice;
import com.ziio.backend.service.AcademicService;
import com.ziio.backend.service.CategoryService;
import com.ziio.backend.service.MyPageService;
import com.ziio.backend.service.NoticeService;
import com.ziio.backend.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.ziio.backend.constants.CrawlingInfos.MAIN_ALL_INFOS;

@RestController
@RequestMapping("/notices")
public class NoticeController {

    @Autowired
    private NoticeService noticeService;
    @Autowired
    private AcademicService academicService;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private MyPageService myPageService;
    @Autowired
    private JwtUtil jwtUtil;

    // 모든 일반 공지사항과 카테고리 목록을 반환하는 메소드(= 공지사항 첫 화면)
    @GetMapping
    public ResponseEntity<Map<String, Object>> getGeneralNotices() {
        List<Notice> generalNotices = noticeService.getNoticesByCategoryIdAndKeyword(MAIN_ALL_INFOS[0][0], null);
        List<Category> categories = categoryService.getAllCategories();

        Map<String, Object> response = new HashMap<>();
        response.put("notices", generalNotices);
        response.put("categories", categories);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    // 부모 카테고리 id와 키워드에 해당하는 공지사항을 반환하는 메소드
    @GetMapping("/search")
    public ResponseEntity<List<Notice>> searchNoticesByCategoryIdAndKeyword(
            @RequestParam(name = "category_id") String categoryId,
            @RequestParam(name = "keyword", required = false) String keyword
    ) {
        List<Notice> notices = noticeService.getNoticesByCategoryIdAndKeyword(categoryId, keyword);

        return new ResponseEntity<>(notices, HttpStatus.OK);
    }

    // 특정 공지사항을 스크랩(마이페이지에 추가)하는 메소드
    @PostMapping("/scraps")
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
            myPageService.addNoticeToMyPage(noticeInfo, request, userEmail);
            // 응답 객체 생성 및 반환
            myPageInfo = MyPageDTO.Info.builder()
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
            Academic academicInfo = academicService.getAcademicById(academicId);
            // 마이페이지에 추가
            myPageService.addAcademicToMyPage(academicInfo, request, userEmail);
            // 응답 객체 생성 및 반환
            myPageInfo = MyPageDTO.Info.builder()
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
    @DeleteMapping("/scraps")
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
