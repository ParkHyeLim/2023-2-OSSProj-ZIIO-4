package com.ziio.backend.crawler;

import com.ziio.backend.service.CategoryService;
import com.ziio.backend.service.NoticeService;
import com.ziio.backend.service.TableSwitchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
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
    private DiceWebsiteCrawler diceWebsiteCrawler;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private NoticeService noticeService;
    @Autowired
    private TableSwitchService tableSwitchService;

    @Scheduled(cron = "0 40 19 * * ?")  // 매일 오후 7시 40분에 실행
    //@PostConstruct
    public void runAllCrawlers() {
        // 각 크롤러 실행
        mainWebsiteCrawler.crawl();
        collegeAndDepartmentWebsiteCrawler.crawl();
        etcWebsiteCrawler.crawl();
        diceWebsiteCrawler.crawl();

        // 새로운 공지사항 & 카테고리 테이블로 교체
        tableSwitchService.switchTables();
    }
    // 학사일정 크롤러 실행
    //@PostConstruct
    public void runAcademicCrawlers() {
        academicCalendarWebsiteCrawler.crawl();
    }
}
