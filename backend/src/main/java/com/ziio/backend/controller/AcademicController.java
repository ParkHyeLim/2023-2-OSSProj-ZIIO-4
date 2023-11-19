package com.ziio.backend.controller;

import com.ziio.backend.entity.Academic;
import com.ziio.backend.service.AcademicService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/academics")
public class AcademicController {

    @Autowired
    private AcademicService academicService;

    @GetMapping
    public List<Academic> getAllAcademics() {
        // 모든 학사 일정을 불러와 반환
        return academicService.getAllAcademics();
    }
}


