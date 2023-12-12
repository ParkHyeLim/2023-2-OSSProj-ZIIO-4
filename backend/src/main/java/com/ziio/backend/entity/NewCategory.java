package com.ziio.backend.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

// 크롤링 후, 기존 카테고리를 대체하기 위한 테이블
@Getter
@Setter
@Entity
public class NewCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // id 자동 +1
    private Long id;

    @Column(nullable = false)
    private String category_id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private int top_fixed;
}
