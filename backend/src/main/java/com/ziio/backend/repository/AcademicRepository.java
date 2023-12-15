package com.ziio.backend.repository;

import com.ziio.backend.entity.Academic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AcademicRepository extends JpaRepository<Academic, Long> {
}
