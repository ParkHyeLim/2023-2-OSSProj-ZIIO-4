package com.ziio.backend.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Academic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // id 자동 +1
    private Long id;

    private String date;
    private String title;

    private String host_department;

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

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getHost_department() {
        return host_department;
    }

    public void setHost_department(String host_department) {
        this.host_department = host_department;
    }
}
