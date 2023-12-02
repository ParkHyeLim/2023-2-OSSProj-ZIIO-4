// 단과대 및 학과 웹사이트
package com.ziio.backend.crawler;

import com.ziio.backend.constants.CrawlingInfos;
import com.ziio.backend.entity.Category;
import com.ziio.backend.entity.Notice;
import com.ziio.backend.service.CategoryService;
import com.ziio.backend.service.NoticeService;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class CollegeAndDepartmentWebsiteCrawler {
    private final NoticeService noticeService;
    private final CategoryService categoryService;
    @Autowired
    public CollegeAndDepartmentWebsiteCrawler(NoticeService noticeService, CategoryService categoryService) {
        this.noticeService = noticeService;
        this.categoryService = categoryService;
    }
    // 크롤링 실행
    public void crawl() {
        String[][] mainAllInfos = CrawlingInfos.COLLEGE_AND_DEPARTMENT_ALL_INFOS;
        for (String[] eachInfo : mainAllInfos) {
            getNoticeList(eachInfo[0], eachInfo[1], eachInfo[2], eachInfo[3], Integer.parseInt(eachInfo[4]));
        }
    }

    // 카테고리 별로 크롤링
    private void getNoticeList(String categoryID, String categoryName, String noticeKind, String noticeNum, int pageLimit) {
        List<String> url_Infos = new ArrayList<>();
        List<String> title_Infos = new ArrayList<>();
        List<String> notice_id_Infos = new ArrayList<>();
        List<String> date_Infos = new ArrayList<>();
        List<String> author_Infos = new ArrayList<>();
        int topFixed = 0; // 상단 고정 공지 개수

        for (int pageNum = 1; pageNum <= pageLimit; pageNum++) {
            String URL = "https://" + noticeKind + ".dongguk.edu/article/notice" + noticeNum + "/list?pageIndex=" + pageNum; // 크롤링할 웹사이트 URL
            Connection conn = Jsoup.connect(URL); // Jsoup 연결 객체 생성
            try {
                Document document = conn.get(); // HTML 구조를 불러와 할당
                topFixed = getNoticeURL(document, noticeKind, noticeNum, url_Infos, pageNum, topFixed); // URL
                getNoticeTitle(document, title_Infos, notice_id_Infos, pageNum, topFixed);                      // 제목
                getNoticeDateAndAuthor(document, date_Infos, author_Infos, pageNum, topFixed); // 게시일, 글 작성자
            } catch (IOException ignored) {
            }
        }
        // 단과대 & 학과 웹사이트 공지사항 DB 저장
        for (int i = 0; i < url_Infos.size(); i++) {
            Notice notice = new Notice();
            notice.setNotice_id(notice_id_Infos.get(i));
            notice.setTitle(title_Infos.get(i));
            notice.setUrl(url_Infos.get(i));
            notice.setDate_posted(date_Infos.get(i));
            notice.setAuthor(author_Infos.get(i));
            notice.setCategory_id(categoryID);
            noticeService.save(notice);
        }
        // 카테고리 DB 저장
        Category category = new Category();
        category.setCategory_id(categoryID);
        category.setName(categoryName);
        category.setTop_fixed(topFixed);
        categoryService.save(category);
    }

    // 1. URL
    private int getNoticeURL(Document document, String noticeKind, String noticeNum, List<String> url_Infos, int pageNum, int topFixed) {
        Elements boardList = document.select("table.board tbody"); // table태그 class명 board => tbody 태그 조회
        int index = 0; // 현 페이지에서 몇 번째 공지인지

        for (Element tr : boardList.select("tr")) { // tr 태그 조회
            if (pageNum > 1 && topFixed > index) { // 중복 제거
                index++;
                continue;
            }
            String detailURL = "";
            // 상단 고정 공지인 경우
            if (tr.select("td.td_tit a").attr("href").equals("#none")) {
                String details = tr.select("td.td_tit a").attr("onclick"); // td태그 class명 td_tit
                detailURL = "https://" + noticeKind + ".dongguk.edu/article/notice" + noticeNum + "/detail/" + details.substring(9, details.length() - 2);
                topFixed++;
            } else if (tr.select("td.td_tit a").attr("href").startsWith("/")){
                String href = tr.select("td.td_tit a").attr("href");
                detailURL = "https://" + noticeKind + ".dongguk.edu" + href;
            } else {
                break;
            }
            url_Infos.add(detailURL);
            index++;
        }
        return topFixed;
    }

    // 2. 공지사항 번호, 제목
    private void getNoticeTitle(Document document, List<String> title_Infos, List<String> notice_id_Infos, int pageNum, int topFixed) {
        Elements boardList = document.select("table.board tbody"); // table태그 class명 board => tbody 태그 조회

        int index = 0; // 현 페이지에서 몇 번째 공지인지
        for (Element tr : boardList.select("tr")) { // tr 태그 조회
            if (pageNum > 1 && topFixed > index) { // 중복 제거
                index++;
                continue;
            }
            // 2.1. 공지사항 번호 크롤링
            String notice_id = tr.select("td.td_num span.num").text(); // td 태그 class명 td_num
            notice_id_Infos.add(notice_id);
            // 2.2 제목 크롤링
            String title = tr.select("td.td_tit a").text(); // td 태그 class명 td_tit
            title_Infos.add(title);
            index++;
        }
    }

    // 3, 4. 게시일, 글 작성자
    private void getNoticeDateAndAuthor(Document document, List<String> date_Infos, List<String> author_Infos, int pageNum, int topFixed) {
        Elements boardList = document.select("table.board tbody"); // table태그 class명 board => tbody 태그 조회
        int index = 0; // 현 페이지에서 몇 번째 공지인지

        for (Element tr : boardList.select("tr")) { // tr 태그 조회
            if (pageNum > 1 && topFixed > index) { // 중복 제거
                index++;
                continue;
            }
            int cnt = 0; // 게시일과 저자를 구분하기 위함
            for (Element td : tr.select("td")) { // td 태그 조회
                if (cnt == 2) { // 3. 저자
                    author_Infos.add(td.text());
                } else if (cnt == 3) { // 4. 게시일
                    date_Infos.add(td.text());
                    break;
                }
                cnt++;
            }
            index++;
        }
    }
}