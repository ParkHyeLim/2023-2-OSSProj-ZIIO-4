package com.ziio.backend.service.crawling;

public class CrawlerManager {
    private MainWebsiteCrawler mainWebsiteCrawler;
    private CollegeAndDepartmentWebsiteCrawler collegeAndDepartmentWebsiteCrawler;
    private AcademicCalendarWebsiteCrawler academicCalendarWebsiteCrawler;
    private EtcWebsiteCrawler etcWebsiteCrawler;

    public CrawlerManager() {
        mainWebsiteCrawler = new MainWebsiteCrawler();
        collegeAndDepartmentWebsiteCrawler = new CollegeAndDepartmentWebsiteCrawler();
        academicCalendarWebsiteCrawler = new AcademicCalendarWebsiteCrawler();
        etcWebsiteCrawler = new EtcWebsiteCrawler();
    }

    public void runAllCrawlers() {
        // 각 크롤러 실행
        mainWebsiteCrawler.crawl();
        collegeAndDepartmentWebsiteCrawler.crawl();
        academicCalendarWebsiteCrawler.crawl();
        etcWebsiteCrawler.crawl();

        // 크롤링된 데이터 처리 로직
        processData();
    }

    private void processData() {
        // 크롤링된 데이터 처리 코드 작성
        // 각 크롤러 클래스의 결과를 병합하거나 원하는 형태로 가공할 수 있습니다.
    }

    public static void main(String[] args) {
        CrawlerManager manager = new CrawlerManager();
        manager.runAllCrawlers();
    }
}
