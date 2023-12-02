package com.ziio.backend.repository;

import com.ziio.backend.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface NoticeRepository extends JpaRepository<Notice, Long> {
    // 공지사항 id와 카테고리 id로 찾아 정보를 반환하는 메소드
    @Query("SELECT n FROM Notice n WHERE n.notice_id = :noticeId AND n.category_id = :categoryId")
    Notice findByNoticeIdAndCategoryId(@Param("noticeId") String noticeId, @Param("categoryId") String categoryId);
}
