package com.ziio.backend.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // id 자동 +1
    private Long id;

    private String category_id;
    private String name;
    private int top_fixed;

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getCategory_id() {
        return category_id;
    }

    public void setCategory_id(String category_id) {
        this.category_id = category_id;
    }

    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public int getTop_fixed() {
        return  top_fixed;
    }
    public void setTop_fixed(int top_fixed) {
        this.top_fixed = top_fixed;
    }
}
