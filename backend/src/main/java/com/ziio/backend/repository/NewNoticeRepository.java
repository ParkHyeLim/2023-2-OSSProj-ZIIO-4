package com.ziio.backend.repository;

import com.ziio.backend.entity.NewNotice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NewNoticeRepository extends JpaRepository<NewNotice, Long> {
}
