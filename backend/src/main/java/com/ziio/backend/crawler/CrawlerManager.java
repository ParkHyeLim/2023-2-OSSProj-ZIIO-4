package com.ziio.backend.crawler;

import com.ziio.backend.service.AcademicService;
import com.ziio.backend.service.CategoryService;
import com.ziio.backend.service.NoticeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class CrawlerManager {
    private MainWebsiteCrawler mainWebsiteCrawler;
    private CollegeAndDepartmentWebsiteCrawler collegeAndDepartmentWebsiteCrawler;
    private AcademicCalendarWebsiteCrawler academicCalendarWebsiteCrawler;
    private EtcWebsiteCrawler etcWebsiteCrawler;
    @Autowired
    public CrawlerManager(NoticeService noticeService, AcademicService academicService, CategoryService categoryService) {
        mainWebsiteCrawler = new MainWebsiteCrawler(noticeService, categoryService);
        collegeAndDepartmentWebsiteCrawler = new CollegeAndDepartmentWebsiteCrawler(noticeService, categoryService);
        academicCalendarWebsiteCrawler = new AcademicCalendarWebsiteCrawler(academicService);
        etcWebsiteCrawler = new EtcWebsiteCrawler(noticeService, categoryService);
    }
    @Scheduled(cron = "0 0 20 * * ?") // 매일 오후 8시에 크롤링 실행
    // 메인, 단과대 & 학과, 기타 크롤러 실행
    public void runAllCrawlers() {
        // 각 크롤러 실행
        mainWebsiteCrawler.crawl();
        collegeAndDepartmentWebsiteCrawler.crawl();
        etcWebsiteCrawler.crawl();
    }
    // 학사일정 크롤러 실행
    public void runAcademicCrawlers() {
        academicCalendarWebsiteCrawler.crawl();
    }
}
