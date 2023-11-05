package com.ziio.backend.service;

import com.ziio.backend.entity.Academic;
import com.ziio.backend.repository.AcademicRepository;
import org.springframework.beans.factory.annotation.Autowired;

@org.springframework.stereotype.Service
public class AcademicService {
    private AcademicRepository academicRepository;

    @Autowired
    public AcademicService(AcademicRepository academicRepository) {
        this.academicRepository = academicRepository;
    }
    // DB에 공지사항 저장
    private void save(Academic academic) {
        academicRepository.save(academic);
    }
}

