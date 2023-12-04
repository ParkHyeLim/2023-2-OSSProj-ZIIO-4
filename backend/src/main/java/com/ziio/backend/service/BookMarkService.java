package com.ziio.backend.service;

import com.ziio.backend.entity.BookMark;
import com.ziio.backend.entity.Category;
import com.ziio.backend.exception.DuplicateRecordException;
import com.ziio.backend.exception.NotFoundException;
import com.ziio.backend.repository.BookMarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class BookMarkService {
    @Autowired
    private BookMarkRepository bookMarkRepository;

    // 특정 사용자의 북마크 목록을 반환하는 메소드
    public List<BookMark> getBookMarks(String userEmail) {

        return bookMarkRepository.getBookMarksByuserEmail(userEmail);
    }

    // 특정 사용자의 즐겨찾기를 등록하는 메소드
    public void addCategoryToBookMark(String userEmail, Category category) {
        // 중복 체크
        long count = bookMarkRepository.countByUserEmailAndCategoryId(userEmail, category.getCategory_id());
        // 중복이 아닌 경우
        if (count == 0) {
            BookMark bookMark = new BookMark();
            bookMark.setUser_email(userEmail);
            bookMark.setCategory_id(category.getCategory_id());
            bookMark.setCategory_name(category.getName());

            bookMarkRepository.save(bookMark);
        } else {
            // 중복인 경우
            throw new DuplicateRecordException("This category is already added to the Bookmark.");
        }
    }

    // 특정 사용자의 즐겨찾기를 삭제하는 메소드
    @Transactional
    public void removeCategoryFromBookMark(String userEmail, String category_id) {
        // 해당 카테고리가 사용자의 즐겨찾기에 있는지 확인
        long count = bookMarkRepository.countByUserEmailAndCategoryId(userEmail, category_id);
        if (count == 0) {
            // 해당 카테고리가 사용자의 즐겨찾기에 없는 경우
            throw new NotFoundException("This category does not exist in the Bookmark.");
        } else {
            // 해당 카테고리가 사용자의 즐겨찾기에 있는 경우 삭제 수행
            bookMarkRepository.deleteByUserEmailAndCategoryId(userEmail, category_id);
        }
    }
}
