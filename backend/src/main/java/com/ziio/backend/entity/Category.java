package com.ziio.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Category {
    @Id
    @GeneratedValue()
    private String id;

    private String name;
    private int top_fixed;

    public String getId() {
        return id;
    }
    public void setId() {
        this.id = id;
    }

    public String getName() {
        return name;
    }
    public void setName() {
        this.name = name;
    }

    public int getTop_fixed() {
        return  top_fixed;
    }
    public void setTop_fixed() {
        this.top_fixed = top_fixed;
    }
}
