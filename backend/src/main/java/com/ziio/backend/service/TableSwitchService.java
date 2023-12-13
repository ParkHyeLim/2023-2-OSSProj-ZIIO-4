package com.ziio.backend.service;

import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Service
public class TableSwitchService {

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public void switchTables() {
        // 1. 기존 테이블 삭제
        entityManager.createNativeQuery("DROP TABLE notice").executeUpdate();
        entityManager.createNativeQuery("DROP TABLE category").executeUpdate();

        // 2. 새로운 테이블로 교체
        entityManager.createNativeQuery("ALTER TABLE new_notice RENAME TO notice").executeUpdate();
        entityManager.createNativeQuery("ALTER TABLE new_category RENAME TO category").executeUpdate();

        // 3. 저장을 위한 테이블 재생성
        entityManager.createNativeQuery("CREATE TABLE new_notice (id BIGINT AUTO_INCREMENT PRIMARY KEY, notice_id BIGINT, category_id VARCHAR(255) NOT NULL, title VARCHAR(255) NOT NULL, url VARCHAR(255) NOT NULL, date_posted VARCHAR(255), author VARCHAR(255))").executeUpdate();
        entityManager.createNativeQuery("CREATE TABLE new_category (id BIGINT AUTO_INCREMENT PRIMARY KEY, category_id VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, top_fixed INT NOT NULL)").executeUpdate();
    }
}

