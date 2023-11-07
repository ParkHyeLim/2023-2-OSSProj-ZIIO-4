package com.ziio.backend.service;

import com.ziio.backend.entity.Category;
import com.ziio.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {
    private CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }
    // DB에 공지사항 저장
    public void save(Category category) {
        categoryRepository.save(category);
    }
}

