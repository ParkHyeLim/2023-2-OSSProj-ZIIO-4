package com.ziio.backend.crawling;

import com.ziio.backend.service.AcademicService;
import com.ziio.backend.service.NoticeService;
import org.springframework.scheduling.annotation.Scheduled;

public class CrawlerManager {
    private MainWebsiteCrawler mainWebsiteCrawler;
    private CollegeAndDepartmentWebsiteCrawler collegeAndDepartmentWebsiteCrawler;
    private AcademicCalendarWebsiteCrawler academicCalendarWebsiteCrawler;
    private EtcWebsiteCrawler etcWebsiteCrawler;

    public CrawlerManager(AcademicService academicService, NoticeService noticeService) {
        mainWebsiteCrawler = new MainWebsiteCrawler();
        collegeAndDepartmentWebsiteCrawler = new CollegeAndDepartmentWebsiteCrawler();
        academicCalendarWebsiteCrawler = new AcademicCalendarWebsiteCrawler(academicService);
        //etcWebsiteCrawler = new EtcWebsiteCrawler(noticeService);
    }
    @Scheduled(cron = "0 0 20 * * ?") // 매일 오후 8시에 크롤링 실행
    public void runAllCrawlers() {
        // 각 크롤러 실행
        //mainWebsiteCrawler.crawl();
        //collegeAndDepartmentWebsiteCrawler.crawl();
        academicCalendarWebsiteCrawler.crawl();
        //etcWebsiteCrawler.crawl();

        // 크롤링된 데이터 처리 로직
        //processData();
    }

    private void processData() {
        // 크롤링된 데이터 처리 코드 작성
        // 각 크롤러 클래스의 결과를 병합하거나 원하는 형태로 가공할 수 있습니다.
    }
}
