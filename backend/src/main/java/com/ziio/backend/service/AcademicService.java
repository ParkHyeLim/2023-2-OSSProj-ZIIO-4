package com.ziio.backend.service;

import com.ziio.backend.entity.Academic;
import com.ziio.backend.repository.AcademicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class AcademicService {
    private final AcademicRepository academicRepository;

    @Autowired
    public AcademicService(AcademicRepository academicRepository) {
        this.academicRepository = academicRepository;
    }

    // DB에 공지사항 저장
    public void save(Academic academic) {
        academicRepository.save(academic);
    }

    // 모든 학사일정 정보를 반환하는 메소드
    public List<Academic> getAllAcademics() {
        return academicRepository.findAll();
    }

    // 특정 ID의 학사일정 정보를 반환하는 메소드
    public Academic getAcademicById(Long id) {
        return academicRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Academic not found with id: " + id));
    }
}