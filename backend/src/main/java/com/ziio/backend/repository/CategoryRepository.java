package com.ziio.backend.repository;

import com.ziio.backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    @Query("SELECT c FROM Category c WHERE c.category_id = :categoryId")
    Category findByCategoryId(@Param("categoryId") String categoryId);
}

