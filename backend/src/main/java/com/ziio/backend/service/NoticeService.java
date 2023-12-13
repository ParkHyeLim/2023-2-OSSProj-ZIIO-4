package com.ziio.backend.service;

import com.ziio.backend.entity.NewNotice;
import com.ziio.backend.entity.Notice;
import com.ziio.backend.repository.NewNoticeRepository;
import com.ziio.backend.repository.NoticeRepository;
import com.ziio.backend.util.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class NoticeService {
    @Autowired
    private NoticeRepository noticeRepository;
    @Autowired
    private NewNoticeRepository newNoticeRepository;
    @Autowired
    private StringUtil stringUtil;

    // DB에 공지사항 저장
    public void save(NewNotice newNotice) {
        newNoticeRepository.save(newNotice);
    }

    // 모든 공지사항 정보를 반환하는 메소드
    public List<Notice> getAllNotices() {
        return noticeRepository.findAll();
    }

    // 특정 공지사항을 반환하는 메소드
    public Notice getNoticeByNoticeIdAndCategoryId(Long noticeId, String categoryId) {
        if (noticeId == null || categoryId == null) {
            throw new IllegalArgumentException("Notice ID and Category ID cannot be null.");
        }

        return noticeRepository.findByNoticeIdAndCategoryId(noticeId, categoryId);
    }

    // 부모 카테고리 id와 키워드를 포함하는 공지사항을 찾아 반환하는 메소드
    public List<Notice> getNoticesByCategoryIdAndKeyword(String category_id, String keyword) {
        String parentId = stringUtil.createParentIdByCategoryId(category_id);

        // parentId로 시작하는 공지사항 필터링
        List<Notice> filteredNotices = getAllNotices()
                .stream()
                .filter(notice -> notice.getCategory_id().startsWith(parentId))
                .collect(Collectors.toList());

        // 키워드가 포함된 공지사항 필터링
        if (keyword == null || keyword.isBlank()) {
            // keyword가 없는 경우, parentId로 시작하는 모든 공지사항 반환
            return filteredNotices;
        } else {
            // keyword가 있는 경우, 해당 키워드가 포함된 공지사항 반환
            return filteredNotices
                    .stream()
                    .filter(notice ->
                            notice.getNotice_id() != null
                            && notice.getTitle().contains(keyword))
                    .collect(Collectors.toList());
        }
    }

    // 모든 공지사항을 삭제하는 메소드
    public void deleteAllNotices() {
        newNoticeRepository.deleteAll();
    }
}
