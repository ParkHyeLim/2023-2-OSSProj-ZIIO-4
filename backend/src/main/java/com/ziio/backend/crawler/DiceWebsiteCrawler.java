// IT융합교육센터 웹사이트
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

import static com.ziio.backend.constants.CrawlingInfos.DICE_INFOS;

@Component
public class DiceWebsiteCrawler {
    @Autowired
    private NoticeService noticeService;
    @Autowired
    private CategoryService categoryService;

    static List<String> url_Infos = new ArrayList<>();
    static List<String> title_Infos = new ArrayList<>();
    static List<String> notice_id_Infos = new ArrayList<>();
    static List<String> date_Infos = new ArrayList<>();
    static List<String> author_Infos = new ArrayList<>();

    // 크롤링 실행
    public void crawl() {
        getNoticeList(DICE_INFOS[0], DICE_INFOS[1], DICE_INFOS[2], Integer.parseInt(DICE_INFOS[3]));
    }

    private void getNoticeList(String categoryID, String categoryName, String URL, int pageLimit) {
        int topFixed = 0; // 상단 고정 공지 개수

        for (int pageNum = 1; pageNum <= pageLimit; pageNum++) {
            Connection conn = Jsoup.connect(URL + "&page=" + pageNum); // Jsoup 연결 객체 생성
            try {
                Document document = conn.get(); // HTML 구조를 불러와 할당
                topFixed = getDiceNotice(document, URL, pageNum, topFixed); // IT융합교육센터 크롤링 실행
            } catch (IOException ignored) {
            }
        }
        // IT융합교육센터 웹사이트 공지사항 DB 저장
        for (int i = 0; i < url_Infos.size(); i++) {
            Notice notice = new Notice();
            notice.setNotice_id(notice_id_Infos.get(i) != null ? Long.parseLong(notice_id_Infos.get(i)) : null);
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

    // 공지번호, 저자, URL, 제목, 작성일
    private int getDiceNotice(Document document, String URL, int pageNum, int topFixed) {
        Elements boardList = document.select("table tbody"); // table태그 => tbody 태그 조회
        int index = 0; // 현 페이지에서 몇 번째 공지인지

        for (Element tr : boardList.select("tr")) { // tr 태그 조회
            if (pageNum > 1 && topFixed > index) { // 중복 제거
                index++;
                continue;
            }

            int tdIndex = 0;
            for (Element td : tr.select("td")) { // td 태그 조회
                switch (tdIndex) {
                    // 1. 상단 고정 or 공지사항 번호 파싱
                    case 0:
                        String noticeId = td.text();
                        if (noticeId.matches("\\d+")) {
                            // 상단 고정 공지가 아닌 경우
                            notice_id_Infos.add(noticeId);
                        } else {
                            // 상단 고정 공지인 경우
                            notice_id_Infos.add(null);
                            topFixed += 1;  // top_fixed 도 1 증가
                        }
                        tdIndex++;
                        break;

                    // 2. 저자 파싱
                    case 1:
                        author_Infos.add(td.text());
                        tdIndex ++;
                        break;

                    // 3. URL, 제목 파싱
                    case 2:
                        String details = td.attr("data-value");
                        String detailURL = URL.replace("list", "view") + "&seq=" + details;
                        url_Infos.add(detailURL);

                        String title = td.select("a").text();
                        title_Infos.add(title);

                        tdIndex ++;
                        break;

                    // 4. 작성일 파싱
                    case 4:
                        date_Infos.add(td.text());
                        tdIndex ++;
                        break;

                    default:
                        tdIndex++;
                        break;
                }
            }
            index++;
        }

        return topFixed;
    }
}
