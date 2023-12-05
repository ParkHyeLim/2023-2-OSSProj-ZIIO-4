package com.ziio.backend.crawler;

import com.ziio.backend.service.CategoryService;
import com.ziio.backend.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class CrawlerManager {
    @Autowired
    private MainWebsiteCrawler mainWebsiteCrawler;
    @Autowired
    private CollegeAndDepartmentWebsiteCrawler collegeAndDepartmentWebsiteCrawler;
    @Autowired
    private EtcWebsiteCrawler etcWebsiteCrawler;
    @Autowired
    private AcademicCalendarWebsiteCrawler academicCalendarWebsiteCrawler;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private NoticeService noticeService;

    //@PostConstruct
    public void runAllCrawlers() {
        // 카테고리와 공지사항 삭제
        categoryService.deleteAllCategories();
        noticeService.deleteAllNotices();
        // 각 크롤러 실행
        mainWebsiteCrawler.crawl();
        collegeAndDepartmentWebsiteCrawler.crawl();
        etcWebsiteCrawler.crawl();
    }
    //@PostConstruct
    // 학사일정 크롤러 실행
    public void runAcademicCrawlers() {
        academicCalendarWebsiteCrawler.crawl();
    }
}
