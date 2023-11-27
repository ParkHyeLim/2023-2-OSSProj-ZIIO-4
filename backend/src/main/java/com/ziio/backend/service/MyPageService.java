package com.ziio.backend.service;

import com.ziio.backend.dto.NoticeDTO;
import com.ziio.backend.entity.Academic;
import com.ziio.backend.entity.MyPage;
import com.ziio.backend.entity.Notice;
import com.ziio.backend.exception.DuplicateRecordException;
import com.ziio.backend.repository.MyPageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MyPageService {

    private final MyPageRepository myPageRepository;

    @Autowired
    public MyPageService(MyPageRepository myPageRepository) {
        this.myPageRepository = myPageRepository;
    }

    // 마이페이지에 학사일정을 추가하는 메소드
    public void addAcademicToMyPage(Academic academic, String userEmail) {
        // 중복 체크
        long count = myPageRepository.countByUserEmailAndAcademicId(userEmail, academic.getId());
        // 중복이 아닌 경우
        if (count == 0) {
            MyPage myPage = new MyPage();
            myPage.setUser_email(userEmail);
            myPage.setStart_date(academic.getStart_date());
            myPage.setEnd_date(academic.getEnd_date());
            myPage.setTitle(academic.getTitle());
            myPage.setColor_code(academic.getColor_code());
            myPage.setAcademic_id(academic.getId());

            myPageRepository.save(myPage);
        } else {
            // 중복인 경우
            throw new DuplicateRecordException("This academic is already added to the MyPage.");
        }
    }

    // 마이페이지에 특정 공지사항을 추가하는 메소드
    public void addNoticeToMyPage(Notice notice, NoticeDTO.Request request, String userEmail) {
        // 중복 체크
        long count = myPageRepository.countByUserEmailAndNoticeId(userEmail, request.getNotice_id());
        // 중복이 아닌 경우
        if (count == 0) {
            MyPage myPage = new MyPage();
            myPage.setNotice_id(notice.getNotice_id());
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
    }
}

