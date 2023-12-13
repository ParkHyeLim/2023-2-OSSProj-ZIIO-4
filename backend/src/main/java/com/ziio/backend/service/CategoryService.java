package com.ziio.backend.service;

import com.ziio.backend.entity.Category;
import com.ziio.backend.entity.NewCategory;
import com.ziio.backend.repository.CategoryRepository;
import com.ziio.backend.repository.NewCategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private NewCategoryRepository newCategoryRepository;

    // DB에 카테고리 저장
    public void save(NewCategory newCategory) {
        newCategoryRepository.save(newCategory);
    }

    // 모든 카테고리 정보를 반환하는 메소드
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // 모든 카테고리를 삭제하는 메소드
    public void deleteAllCategories() {
        newCategoryRepository.deleteAll();
    }

    // category_id로 카테고리를 찾아 정보를 반환하는 메소드
    public Category getCategoryByCategoryId(String categoryId) {
        return categoryRepository.findByCategoryId(categoryId);
    }
}

