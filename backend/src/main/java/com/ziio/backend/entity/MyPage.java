package com.ziio.backend.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Column;

@Getter
@Setter
@Entity
public class MyPage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long my_page_id;

    @Column
    private Long academic_id;

    @Column
    private String notice_id;

    @Column
    private String category_id;

    @Column(nullable = false)
    private String user_email;

    @Column
    private String start_date;

    @Column
    private String end_date;

    @Column(nullable = false)
    private String title;

    @Column
    private String color_code;

    @Column
    private String url;

    @Column
    private String memo;

}
