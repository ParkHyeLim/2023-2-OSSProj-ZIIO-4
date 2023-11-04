// 동국대학교 메인 웹사이트
package com.ziio.backend.service.crawling;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class MainWebsiteCrawler {
    // 크롤링 실행
    public void crawl() {
        // 웹사이트별 변수명, 카테고리 ID, 페이지 한정
        String[][] mainAllInfos = new String[][]{{"GENERALNOTICES","100100000", "3"}, {"HAKSANOTICE","100101000", "3"}, {"JANGHAKNOTICE","100102000", "3"}};
        for (String[] eachInfo : mainAllInfos) {
            getNoticeList(eachInfo[0], eachInfo[1], Integer.parseInt(eachInfo[2]));
            }
        }
    // 카테고리 별로 크롤링
    private void getNoticeList(String noticeKind, String categoryID, int pageLimit) {
        List<String> url_Infos = new ArrayList<>(); List<String> title_Infos = new ArrayList<>();
        List<String> date_Infos = new ArrayList<>(); List<String> author_Infos = new ArrayList<>();
        int topFixed = 0; // 상단 고정 공지 개수

        for (int pageNum = 1; pageNum <= pageLimit; pageNum++) {
            String URL = "https://www.dongguk.edu/article/" + noticeKind + "/list?pageIndex=" + pageNum + "&"; // 크롤링할 웹사이트 URL
            Connection conn = Jsoup.connect(URL); // Jsoup 연결 객체 생성
            try {
                Document document = conn.get(); // HTML 구조를 불러와 할당
                getNoticeURL(document, noticeKind, url_Infos, topFixed);              // URL
                topFixed = getNoticeTitle(document, title_Infos, topFixed);           // 제목
                getNoticeDateAndAuthor(document, date_Infos, author_Infos, topFixed); // 게시일, 글 작성자
            } catch (IOException ignored) {
            }
        }
        // DB 저장 로직 구현 예정
        for (int i = 0; i < url_Infos.size(); i++) {
            //StringBuilder sb = new StringBuilder();
            //sb.append(url_Infos.get(i));
            //sb.append(title_Infos.get(i));
            //sb.append(date_Infos.get(i));
            //sb.append(author_Infos.get(i));
            System.out.println(title_Infos.get(i));
        }
    }
    // 1. URL
    private void getNoticeURL(Document document, String noticeKind, List<String> url_Infos, int topFixed) {
        Elements boardList = document.select("div.board_list ul"); // class명이 board_list인 ul 태그 조회
        int index = 0; // 현 페이지에서 몇 번째 공지인지
        for (Element li : boardList.select("li")) { // li 태그 조회
            if (topFixed > index) { // 중복 제거
                index++;
                continue;
            }
            String details = li.select("a").attr("onclick");
            String detailURL = "https://www.dongguk.edu/article/" + noticeKind + "/detail/" + details.substring(9,details.length()-2);
            url_Infos.add(detailURL);
            index++;
        }
    }
    // 2. 제목
    private int getNoticeTitle(Document document, List<String> title_Infos, int topFixed) {
        Elements boardList = document.select("div.board_list ul"); // class명이 board_list인 ul 태그 조회
        int index = 0; // 현 페이지에서 몇 번째 공지인지

        for (Element top : boardList.select("li div.top")) { // li 태그 => div 클래스 top 태그 조회
            if (topFixed > index) { // 중복 제거
                index++;
                continue;
            }
            // 2. 공지사항 제목 파싱
            String title = top.select("p.tit").text();
            // 상단 고정 공지 개수 파악
            if (title.startsWith("공지")) {
                topFixed++;
            }
            title_Infos.add(title);
            index++;
        }
        return topFixed;
    }
    // 3, 4. 게시일, 글 작성자
    private void getNoticeDateAndAuthor(Document document, List<String> date_Infos, List<String> author_Infos, int topFixed) {
        Elements boardList = document.select("div.board_list ul"); // class명이 board_list인 ul 태그에 조회
        int index = 0; // 현 페이지에서 몇 번째 공지인지
        for (Element li : boardList.select("li div.top")) { // li 태그 => div 클래스 top 태그 조회
            if (topFixed > index) { // 중복 제거
                index++;
                continue;
            }
            int cnt = 0; // 게시일과 저자를 구분하기 위함
            for (Element span : li.select("div.info span")) { // div 클래스 info 태그 => span 태그 조회
                if (cnt == 0) { // 3. 게시일
                    date_Infos.add(span.text());
                    cnt++;
                } else if (cnt == 1) { // 4. 글 작성자
                    author_Infos.add(span.text());
                } else {
                    break;
                }
            }
            index++;
        }
    }
}
