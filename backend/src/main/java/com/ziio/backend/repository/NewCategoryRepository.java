package com.ziio.backend.repository;

import com.ziio.backend.entity.NewCategory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewCategoryRepository extends JpaRepository<NewCategory, Long> {
}
