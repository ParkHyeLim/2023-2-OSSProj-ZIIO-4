package com.ziio.backend.service;

import com.ziio.backend.entity.Notice;
import com.ziio.backend.repository.NoticeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class NoticeService {
    private final NoticeRepository noticeRepository;

    @Autowired
    public NoticeService(NoticeRepository noticeRepository) {
        this.noticeRepository = noticeRepository;
    }

    // DB에 공지사항 저장
    public void save(Notice notice) {
        noticeRepository.save(notice);
    }

    // 모든 공지사항 정보를 반환하는 메소드
    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }
}
