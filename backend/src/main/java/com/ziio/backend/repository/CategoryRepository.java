package com.ziio.backend.repository;

import com.ziio.backend.entity.Notice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Notice, Long> {

}

