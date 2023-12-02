package com.ziio.backend.repository;

import com.ziio.backend.entity.BookMark;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface BookMarkRepository extends JpaRepository<BookMark, Long> {
    // 사용자의 이메일과 카테고리 id를 기준으로 개수를 카운트하는 메소드
    @Query("SELECT COUNT(bm) FROM BookMark bm WHERE bm.user_email = :userEmail AND bm.category_id = :categoryId")
    long countByUserEmailAndCategoryId(@Param("userEmail") String userEmail, @Param("categoryId") String categoryId);

    // 사용자의 이메일과 카테고리 id를 기준으로 삭제하는 메소드
    @Modifying
    @Query("DELETE FROM BookMark bm WHERE bm.user_email = :userEmail AND bm.category_id = :categoryId")
    void deleteByUserEmailAndCategoryId(@Param("userEmail") String userEmail, @Param("categoryId") String categoryId);
}
