package com.ziio.backend.service;

import com.ziio.backend.dto.MyPageDTO;
import com.ziio.backend.dto.NoticeDTO;
import com.ziio.backend.entity.Academic;
import com.ziio.backend.entity.MyPage;
import com.ziio.backend.entity.Notice;
import com.ziio.backend.exception.DuplicateRecordException;
import com.ziio.backend.exception.NotFoundException;
import com.ziio.backend.repository.MyPageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MyPageService {

    @Autowired
    private NoticeService noticeService;
    @Autowired
    private MyPageRepository myPageRepository;

    // 특정 사용자의 스크랩된 공지사항 id를 반환하는 메소드
    public List<Long> getScrapIdsByUserEmail(String userEmail) {

        // 사용자의 스크랩 목록
        List<MyPage> userScraps = getAllMyPagesByUserEmail(userEmail);

        List<Long> userScrapIds = new ArrayList<>();
        // 스크랩된 공지사항 id 목록
        for (MyPage scrap : userScraps) {
            // 학사일정은 제외
            if (scrap.getAcademic_id() == null) {
                Notice notice = noticeService.getNoticeByNoticeIdAndCategoryId(scrap.getNotice_id(), scrap.getCategory_id());
                userScrapIds.add(notice.getId());
            }
        }

        return userScrapIds;
    }

    // 마이페이지에 학사일정을 추가하는 메소드
    public Long addAcademicToMyPage(Academic academic, NoticeDTO.Request request, String userEmail) {
        // 중복 체크
        long count = myPageRepository.countByUserEmailAndAcademicId(userEmail, academic.getId());
        // 중복이 아닌 경우
        if (count == 0) {
            MyPage myPage = new MyPage();
            myPage.setAcademic_id(academic.getId());
            myPage.setUser_email(userEmail);
            myPage.setStart_date(academic.getStart_date());
            myPage.setEnd_date(academic.getEnd_date());
            myPage.setTitle(request.getTitle() == null ? academic.getTitle() : request.getTitle());
            myPage.setColor_code(request.getColor_code() == null ? academic.getColor_code() : request.getColor_code());
            myPage.setMemo(request.getMemo());

            myPageRepository.save(myPage);
        } else {
            // 중복인 경우
            throw new DuplicateRecordException("This academic is already added to the MyPage.");
        }

        return myPageRepository.findByUserEmailAndAcademicId(userEmail, academic.getId()).getMy_page_id();
    }

    // 마이페이지에 공지사항을 추가하는 메소드
    public Long addNoticeToMyPage(Notice notice, NoticeDTO.Request request, String userEmail) {
        // 중복 체크
        long count = myPageRepository.countByUserEmailAndNoticeIdAndCategoryId(userEmail, request.getNotice_id(), request.getCategory_id());
        // 중복이 아닌 경우
        if (count == 0) {
            MyPage myPage = new MyPage();
            myPage.setNotice_id(notice.getNotice_id());
            myPage.setCategory_id(notice.getCategory_id());
            myPage.setUser_email(userEmail);
            myPage.setStart_date(request.getStart_date());
            myPage.setEnd_date(request.getEnd_date());
            myPage.setTitle(notice.getTitle());
            myPage.setColor_code(request.getColor_code());
            myPage.setUrl(notice.getUrl());
            myPage.setMemo(request.getMemo());

            myPageRepository.save(myPage);
        } else {
            // 중복인 경우
            throw new DuplicateRecordException("This notice is already added to the MyPage.");
        }

        return myPageRepository.findByUserEmailAndNoticeIdAndCategoryId(userEmail, request.getNotice_id(), request.getCategory_id()).getMy_page_id();
    }

    // 마이페이지에 개인 일정을 추가하는 메소드
    public MyPageDTO.PostResponse addMyPage(MyPageDTO.Request request, String userEmail) {

        // 마이페이지에 저장
        MyPage myPage = new MyPage();
        myPage.setTitle(request.getTitle());
        myPage.setStart_date(request.getStart_date());
        myPage.setEnd_date(request.getEnd_date());
        myPage.setUrl(request.getUrl());
        myPage.setColor_code(request.getColor_code());
        myPage.setMemo(request.getMemo());
        myPage.setUser_email(userEmail);
        myPageRepository.save(myPage);

        // 마이페이지에서 my_page_id 찾기
        Long myPageId = myPage.getMy_page_id();

        // 응답 객체 생성 및 반환
        MyPageDTO.PostResponse addedMyPageResponse = MyPageDTO.PostResponse.builder()
                .my_page_id(myPageId)
                .start_date(myPage.getStart_date())
                .end_date(myPage.getEnd_date())
                .title(myPage.getTitle())
                .url(myPage.getUrl())
                .color_code(myPage.getColor_code())
                .memo(myPage.getMemo())
                .message("successfully added.")
                .build();

        return addedMyPageResponse;
    }

    // 마이페이지에서 특정 공지사항을 삭제하는 메소드
    public void removeNoticeFromMyPage(Long noticeId, String categoryId, String userEmail) {
        if (noticeId == null || categoryId == null) {
            throw new IllegalArgumentException("Notice ID and Category ID cannot be null.");
        }

        // 해당 공지사항이 마이페이지에 존재하는지 확인
        MyPage myPage = myPageRepository.findByUserEmailAndNoticeIdAndCategoryId(userEmail, noticeId, categoryId);

        if (myPage != null) {
            // 존재한다면 삭제
            myPageRepository.delete(myPage);
        } else {
            // 존재하지 않는 경우
            throw new NotFoundException("This notice does not exist in the MyPage.");
        }
    }

    // 마이페이지에서 특정 학사일정을 삭제하는 메소드
    public void removeAcademicFromMyPage(Long academicId, String userEmail) {
        // 해당 공지사항이 마이페이지에 존재하는지 확인
        MyPage myPage = myPageRepository.findByUserEmailAndAcademicId(userEmail, academicId);

        if (myPage != null) {
            // 존재한다면 삭제
            myPageRepository.delete(myPage);
        } else {
            // 존재하지 않는 경우
            throw new NotFoundException("This academic does not exist in the MyPage.");
        }
    }

    // 특정 사용자의 마이페이지를 모두 반환하는 메소드
    public List<MyPage> getAllMyPagesByUserEmail(String userEmail) {
        return myPageRepository.findByUserEmail(userEmail);
    }

    // 특정 사용자의 마이페이지를 수정하는 메소드
    public MyPage updateMyPage(Long myPageId, MyPageDTO.Request request, String userEmail) {
        // 업데이트할 마이페이지 찾기
        MyPage myPage = myPageRepository.findById(myPageId)
                .orElseThrow(() -> new NotFoundException("MyPage not found with ID: " + myPageId));

        // 사용자가 해당 마이페이지를 소유하고 있는지 확인
        if (!myPage.getUser_email().equals(userEmail)) {
            throw new NotFoundException("MyPage not found for the user with ID: " + myPageId);
        }

        // 업데이트할 필드 설정
        if (request.getTitle() != null) {
            myPage.setTitle(request.getTitle());
        }
        if (request.getStart_date() != null) {
            myPage.setStart_date(request.getStart_date());
        }
        // 종료 일자, url, 색상, 메모는 null값 허용
        myPage.setEnd_date(request.getEnd_date());
        myPage.setUrl(request.getUrl());
        myPage.setColor_code(request.getColor_code());
        myPage.setMemo(request.getMemo());

        myPageRepository.save(myPage);

        return myPage;
    }
}

