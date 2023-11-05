package com.ziio.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Academic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // id 자동 +1
    private Long id;

    private String date;
    private String titleAndHostDepartment;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTitleAndHostDepartment() {
        return titleAndHostDepartment;
    }

    public void setTitleAndHostDepartment(String titleAndHostDepartment) {
        this.titleAndHostDepartment = titleAndHostDepartment;
    }
}
