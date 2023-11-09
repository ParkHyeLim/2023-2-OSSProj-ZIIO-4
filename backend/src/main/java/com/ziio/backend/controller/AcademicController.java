package com.ziio.backend.controller;

import com.ziio.backend.crawler.CrawlerManager;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller
public class AcademicController {
    private final CrawlerManager crawlerManager;

    @Autowired
    public AcademicController(CrawlerManager crawlerManager) {
        this.crawlerManager = crawlerManager;
    }

    @PostConstruct
    public void startCrawling() {
        // 크롤링 실행
        crawlerManager.runAcademicCrawlers();
    }
}
