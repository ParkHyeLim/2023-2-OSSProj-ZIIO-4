package com.ziio.backend.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

// 크롤링 후, 기존 공지사항을 대체하기 위한 테이블
@Getter
@Setter
@Entity
public class NewNotice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // id 자동 +1
    private Long id;

    @Column
    private Long notice_id;

    @Column(nullable = false)
    private String category_id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String url;

    @Column
    private String date_posted;

    @Column
    private String author;
}
