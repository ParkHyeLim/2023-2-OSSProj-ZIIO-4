// 동국대학교 메인 웹사이트
package com.ziio.backend.component.jsoup;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;

public class MainWebsiteCrawler {

    // 홈페이지별 URL을 생성한 후, 크롤링을 진행하는 메소드
    public static void getNoticeList(String noticeKind, String categoryID, int pageNum) {
        String URL = "https://www.dongguk.edu/article/" + noticeKind + "/list?pageIndex=" + Integer.toString(pageNum) + "&"; // 크롤링할 웹사이트 URL
        Connection conn = Jsoup.connect(URL); // Jsoup 연결 객체 생성

        try {
            Document document = conn.get(); // HTML 구조를 불러와 할당

            String noticeURL = getNoticeURL(document, noticeKind); // URL 크롤링
            System.out.println(noticeURL);

            String noticeTitle = getNoticeTitle(document); // 공지사항 제목
            System.out.println(noticeTitle);

            String noticeDate = getNoticeDate(document); // 게시일, 저자
            System.out.println(noticeDate);

        } catch (IOException ignored) {
        }
    }

    // 1. URL 크롤링
    public static String getNoticeURL(Document document, String noticeKind) {

        Elements boardList = document.select("div.board_list ul"); // class명이 board_list인 ul 태그 조회

        StringBuilder sb = new StringBuilder(); // StringBuilder 생성
        for (Element li : boardList.select("li")) { // li 태그 조회

            String str = li.select("a").attr("onclick");
            String url = "https://www.dongguk.edu/article/" + noticeKind + "/detail/" + str.substring(9,str.length()-2);
            sb.append(url); sb.append(" ");
            sb.append(System.getProperty("line.separator")); // 줄바꿈
        }
        return sb.toString();
    }

    // 2. 공지사항 제목
    public static String getNoticeTitle(Document document) {

        Elements boardList = document.select("div.board_list ul"); // class명이 board_list인 ul 태그 조회

        StringBuilder sb = new StringBuilder(); // StringBuilder 생성
        for (Element top : boardList.select("li div.top")) { // li 태그 => div 클래스 top 태그 조회
            // 2. 공지사항 제목 파싱
            String title = top.select("p.tit").text();
            sb.append(title); sb.append(" ");
            sb.append(System.getProperty("line.separator")); // 줄바꿈
        }
        return sb.toString();
    }

    // 3, 4. 게시일, 저자 크롤링
    public static String getNoticeDate(Document document) {

        Elements boardList = document.select("div.board_list ul"); // class명이 board_list인 ul 태그에 조회

        StringBuilder sb = new StringBuilder(); // StringBuilder 생성
        for (Element li : boardList.select("li div.top")) { // li 태그 => div 클래스 top 태그 조회
            int cnt = 0; // 게시일과 저자를 구분하기 위함
            for (Element span : li.select("div.info span")) { // div 클래스 info 태그 => span 태그 조회
                // 3. 게시일, 4. 저자 파싱
                sb.append(span.text()); sb.append(" ");
                cnt += 1;
                if (cnt > 1) break;
            }
            sb.append(System.getProperty("line.separator")); // 줄바꿈
        }
        return sb.toString();
    }

    public static void main(String args[]) {
        // 메인 홈페이지 변수명, 카테고리 ID
        String[][] kind = new String[][]{{"GENERALNOTICES","1"}, {"HAKSANOTICE","2"}, {"JANGHAKNOTICE","3"}};
        for (String[] k : kind) {
            for (int pageNum = 1; pageNum <= 1; pageNum++) { // 페이지 설정
                getNoticeList(k[0], k[1], pageNum);
            }
        }
    }

}
