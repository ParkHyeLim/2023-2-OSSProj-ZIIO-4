// 단과대 홈페이지
package com.ziio.backend.component.jsoup;

import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;

public class JsoupComponentLocalCollege {

    // 홈페이지별 URL을 생성한 후, 크롤링을 진행하는 메소드
    public static void getNoticeList(String noticeKind, String noticeNum, String categoryID, int pageNum) {
        String URL = "https://" + noticeKind + ".dongguk.edu/article/notice" + noticeNum + "/list?pageIndex=" + Integer.toString(pageNum); // 크롤링할 웹사이트 URL
        Connection conn = Jsoup.connect(URL); // Jsoup 연결 객체 생성

        try {
            Document document = conn.get(); // HTML 구조를 불러와 할당

            String noticeURL = getNoticeURL(document, noticeKind, noticeNum); // URL 크롤링
            System.out.println(noticeURL);

            String noticeTitle = getNoticeTitle(document); // 공지사항 제목
            System.out.println(noticeTitle);

            String noticeDate = getNoticeDate(document); // 게시일, 저자
            System.out.println(noticeDate);

        } catch (IOException ignored) {
        }
    }

    // 1. URL 크롤링
    public static String getNoticeURL(Document document, String noticeKind, String noticeNum) {

        Elements boardList = document.select("table.board tbody"); // table태그 class명 board => tbody 태그 조회

        StringBuilder sb = new StringBuilder(); // StringBuilder 생성
        for (Element tr : boardList.select("tr")) { // tr 태그 조회
            String url = "";
            // 상단 고정 공지인 경우
            if (tr.select("td.td_tit a").attr("href").equals("#none")) {
                String str = tr.select("td.td_tit a").attr("onclick"); // td태그 class명 td_tit
                url = "https://" + noticeKind + ".dongguk.edu/article/notice" + noticeNum + "/detail/" + str.substring(9,str.length()-2);
            }
            else {
                String href = tr.select("td.td_tit a").attr("href");
                url = "https://" + noticeKind + ".dongguk.edu" + href;
            }
            sb.append(url); sb.append(" ");
            sb.append(System.getProperty("line.separator")); // 줄바꿈
        }
        return sb.toString();
    }

    // 2. 공지사항 제목
    public static String getNoticeTitle(Document document) {

        Elements boardList = document.select("table.board tbody"); // table태그 class명 board => tbody 태그 조회

        StringBuilder sb = new StringBuilder(); // StringBuilder 생성
        for (Element tr : boardList.select("tr")) { // tr 태그 조회
            // 2. 공지사항 제목 파싱
            String title = tr.select("td.td_tit a").text(); // td 태그 class명 td_tit
            sb.append(title); sb.append(" ");
            sb.append(System.getProperty("line.separator")); // 줄바꿈
        }
        return sb.toString();
    }

    // 3, 4. 게시일, 저자 크롤링
    public static String getNoticeDate(Document document) {

        Elements boardList = document.select("table.board tbody"); // table태그 class명 board => tbody 태그 조회

        StringBuilder sb = new StringBuilder(); // StringBuilder 생성
        for (Element tr : boardList.select("tr")) { // tr 태그 조회

            int cnt = 0; // 게시일과 저자만 파싱하기 위함
            for (Element td : tr.select("td")) { // td 태그 조회
                // 3. 게시일, 4. 저자 파싱
                if (cnt >= 2)  {
                    sb.append(td.text()); sb.append(" ");
                }
                cnt += 1;
                if (cnt >= 4) break;
            }
            sb.append(System.getProperty("line.separator")); // 줄바꿈
        }
        return sb.toString();
    }

    public static void main(String args[]) {
        // 단과대 변수명, notice no, 카테고리 ID
        String[][] kind = new String[][]{{"bs","","8"},{"liberal","","9"}, {"science","","10"}};
        for (String k[] : kind) {
            for (int pageNum = 1; pageNum <= 1; pageNum++) { // 페이지 설정
                getNoticeList(k[0], k[1], k[2], pageNum);
            }
        }
    }

}
