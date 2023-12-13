# 2023-2-OSSProj-ZIIO-4
2023-2 오픈소스소프트웨어프로젝트 4조 ZIIO 팀의 레포지토리입니다.

## 배포 URL 🌐
https://dgu-campus-calendar-ziio.vercel.app/

<img src="https://img.shields.io/badge/vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"> <img src="https://img.shields.io/badge/amazon ec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">

## 팀원	소개👋🏻
|<img src="https://github.com/Kong-E.png" width="200" height="200" />|<img src="https://github.com/ParkHyeLim.png" width="200" height="200" />|<img src="https://github.com/bbbang105.png" width="200" height="200" />|
|:---:|:---:|:---:|
|[공소연](https://github.com/Kong-E)|[박혜림](https://github.com/ParkHyeLim)|[한상호](https://github.com/bbbang105)|
|프론트엔드|프론트엔드|백엔드|
|경제학과|사학과|경영정보학과|
|2020110210|2019110340|2018111366|
|디자인, 소셜로그인, 마이페이지, 반응형 UI|프로젝트 관리, 공지사항, 학사일정, 배포|API 구현, DB 구축, 크롤링, 서버 구축 및 배포|

---

## 프로젝트 소개 📑
<img width="1645" alt="image" src="https://github.com/CSID-DGU/2023-2-OSSProj-ZIIO-4/assets/113084292/73f36ae4-9cc3-4347-9550-6166d5feb1ab">

### 프로젝트명
'학사통달' - 동국대학교 공지사항 통합 달력의 준말.

### 의의
 64개의 동국대학교 공지사항 페이지와 학사 일정 페이지를 통합한 시스템을 구축하여 학교 산하 사이트의 공지사항을 학생들이 사이트를 직접 찾아서 정보를 습득하는 기존 방식에서 벗어나고자 한다. 또한 사용자 일정 관리 캘린더 시스템을 구현하고, 이를 구글 캘린더와의 연동함으로서 학교 공지사항 및 학사 일정을 실제 본인의 일정으로 관리할 수 있도록 한다.

### 현행 시스템 분석

동국대학교 공지사항은 크게 학교 대표 홈페이지, 단과대 홈페이지, 학과 홈페이지에 분산되어 등록되고 있다. 또한 동국대학교 대표 홈페이지에는 일반, 학사, 입시, 장학 등의 10개의 공지사항 세부 구분이 있으며, 단과대 홈페이지나 학과 홈페이지는 사이트의 관리자가 모두 다르기에, 공지사항의 세부 구분 및 게시 기준에 차이가 있다. 이러한 현행 공지사항 시스템은 학생들이 원하는 공지사항을 찾는 부분에서 다음과 같은 불편함을 야기한다.

`1) 공지사항의 사이트의 존재에 대한 낮은 인식도`
   
 등록, 장학, 학사 일정과 관련한 정보는 학교 대표 홈페이지의 공지사항에 게시된다. 이에 학생들은 대표 홈페이지의 공지사항을 확인하는 것은 익숙하다. 그러나 본인의 단과대 혹은 학과의 개별 사이트에 공지사항이 올라온다는 사실이나, 사이트의 존재 여부를 모르는 학생이 많다. 이는 모든 학생들에게 전달되어야 할 공지사항의 역할을 다하지 못하고 있는 것이다. 더불어, 단과대나, 학과 사이트의 관심도가 낮아짐에 따라 사이트가 효율적으로 이용되지 못하고 있는 사실의 반증이며, 다음의 문제로 이어진다.

`2) 불필요한 검색 및 재접속 빈도 증가`

 동국대학교 공지사항 관리자는 각 사이트별로 다르기에, 원하는 공지사항의 게시 위치를 짐작하기 어렵다. 이에 학생은 원하는 정보를 찾기 위해서 별도의 검색이 필요하며, 사이트의 존재를 인지하지 못하는 학생의 경우, 원하는 정보를 찾는데 어려움이 발생한다.
 
조교 모집, 근로 모집 공지들은 대체로 대표 홈페이지에도 게시를 하기에, 각 학과 홈페이지에 방문하지 않고도 정보를 얻을 수 있다. 그러나 경영정보학과 홈페이지에 게시된 공지를 대표 홈페이지에서 검색해 본 결과, 게시되어 있지 않은 것을 확인하였다. 이와 같은 경우는 빈번하게 발생하고 있으며, 정확한 정보를 얻기 위해서 학생들은 최소 2개의 웹 사이트를 방문해야 한다.

`3) 불규칙한 공지사항 위치로 인한 정보 전달의 효율성 감소`

위의 문제들은 결국 공지사항이 학생들에 효율적으로 전달되지 못하는 문제 상황을 발생시킨다.

현재 학교에서는 기업과 연계한 프로그램을 진행하는 경우가 많다. 하지만 관련 학과 학생들이 자주 방문하는 AI 융합대학 홈페이지나 IT 융합교육센터 홈페이지에는 해당 공지들이 게시되어 있지 않은 경우가 많다. 이는 공지사항이 적절한 위치에 게시 되고 있지 않아, 실질적으로 해당 정보가 필요한 학생들에게 효율적으로 도달하지 못함을 의미한다.
 
![image](https://github.com/CSID-DGU/2023-2-OSSProj-ZIIO-4/assets/113084292/ee885b77-43f3-4a5a-b10e-82933461f4bc)

### 라이선스
`GPL v2.0`

### 기대효과
첫째, 공지사항과 학사일정을 하나의 웹 사이트에서 확인할 수 있도록 하여 학생들이 공지사항을 기존보다 쉽고 빠르게 원하는 정보를 찾을 수 있다. 이를 통해 각 사이트에 공지사항이 이용자에게 전달될 확률을 높여 학생들이 학교에서 제공하는 정보를 얻는 데 용이해질 것이다. 더 나아가서는 각 사이트를 별도의 검색 없이도 쉽게 방문할 수 있게 되면서 개별 사이트들이 기존보다 활성화될 것이다.

둘째, 사이트 자체에서 공지와 학사일정을 스크랩하고 일정을 등록할 수 있게 되면서, 이용자가 학교 관련 일정을 기존보다 세세하게 관리할 수 있다. 또한 구글 소셜 로그인으로 마이페이지 내 캘린더를 구글 캘린더와 연동함으로써, 사용자들이 본 사이트를 접속하여 마이페이지에서 스크랩한 일정을 확인할 필요없이 휴대전화에서 쉽게 확인할 수 있게 하여 일정 관리의 효율성을 높인다.  

---

## 사용한 기술 스택 🛠️

### Frontend

<img src="https://img.shields.io/badge/react 18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 

<img src="https://img.shields.io/badge/react dom-18.2.0-61DAFB?style=for-the-badge&logo=&logoColor=black"> <img src="https://img.shields.io/badge/react query - 3.39.3-61DAFB?style=for-the-badge&logo=&logoColor=black">
<img src="https://img.shields.io/badge/react icons-4.11.0-61DAFB?style=for-the-badge&logo=&logoColor=black">
<img src="https://img.shields.io/badge/react responsive-9.0.2-61DAFB?style=for-the-badge&logo=&logoColor=black">
<img src="https://img.shields.io/badge/react routerdom-6.16.0-61DAFB?style=for-the-badge&logo=&logoColor=black">
<img src="https://img.shields.io/badge/react scripts-5.0.1-61DAFB?style=for-the-badge&logo=&logoColor=black">

<img src="https://img.shields.io/badge/Goolge FullCalendar 6.1.9-003545?style=for-the-badge&logo=&logoColor=white"> <img src="https://img.shields.io/badge/axios 1.6.2-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
<img src="https://img.shields.io/badge/recoil 0.7.7-3578E5?style=for-the-badge&logo=recoil&logoColor=white">
<img src="https://img.shields.io/badge/classnames-2.3.2-003545?style=for-the-badge&logo=&logoColor=white">
<img src="https://img.shields.io/badge/antd-5.11.4-003545?style=for-the-badge&logo=&logoColor=white">
  
### Backend

<img src="https://img.shields.io/badge/java 11-007396?style=for-the-badge&logo=openjdk&logoColor=white"> <img src="https://img.shields.io/badge/spring boot 2.7.13-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"> <img src="https://img.shields.io/badge/spring security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white">
<img src="https://img.shields.io/badge/hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white">
<img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">
<img src="https://img.shields.io/badge/amazon rds-527FFF?style=for-the-badge&logo=amazonrds&logoColor=white">
<img src="https://img.shields.io/badge/amazon ec2-FF9900?style=for-the-badge&logo=amazonec2&logoColor=white">
<img src="https://img.shields.io/badge/Jsoup 1.15.3-003545?style=for-the-badge&logo=&logoColor=white">
<img src="https://img.shields.io/badge/Google OAuth2.0-003545?style=for-the-badge&logo=&logoColor=white">

---

## 기능 소개 🗓️

### 공지사항 페이지

<img width="1636" alt="image" src="https://github.com/CSID-DGU/2023-2-OSSProj-ZIIO-4/assets/113084292/455c2e60-3f4c-45f5-92cb-681b239f2e2c">

📍 사이트 접속 시 가장 먼저 보이는 페이지로, 사용자가 카테고리를 선택한 후 선택적으로 검색어를 추가하여 원하는 공지사항을 찾을 수 있도록 구현하였다.

📍 첫 접속 상태는 현재와 같이 비 로그인 상태이므로, 사용자의 Session Storage에 검색 기록을 저장한 후 이를 검색한 공지사항 목록으로 보여주고, 별도의 카테고리 없이 사용자가 목록에서 카테고리를 누르면 해당 카테고리 공지사항을 검색하도록 구현하였다.

📍 사용자가 로그인을 했을 경우에는 검색한 공지사항 목록이 사라지고 즐겨찾기 공지사항이 보이며, 해당 부분에서는 사용자가 즐겨찾기한 카테고리를 목록을 DB에서 받아 보여주는 형태로 구현하였다. 이 목록 또한 검색한 공지사항 목록과 동일하게 카테고리를 누름으로써 해당 카테고리의 공지사항들을 보여준다.

📍 공지사항이 검색되었을 경우에는 사이트 내에서 공지로 강조된 항목(이하 상단고정)을 본 프로젝트에서도 그대로 반영하였고, 이때 상단 고정 공지사항의 경우 스크랩을 할 수 없게 버튼을 제거하였다.

📍 본 프로젝트의 대표 기능으로, 원하는 공지사항 항목을 누르면 새 창으로 해당 공지사항 페이지가 열린다. 사용자는 열린 새 창으로 원하는 공지사항인지 쉽게 판단할 수 있으며, 새 창으로 공지사항 원본을 열음으로써, '학사통달' 페이지와의 이동이 쉽고 자유롭도록 구현하였다.

---

<img width="1676" alt="image" src="https://github.com/CSID-DGU/2023-2-OSSProj-ZIIO-4/assets/113084292/645fd46a-45c6-4d84-ade4-0d91ca7f7240">

📍 만일 이미 즐겨찾기에 있는 카테고리를 검색했을 때는, 중복을 방지하기 위해 1차적으로 Front 측에서 판단하여 버튼을 비활성화 시켜두었다.

📍 스크랩의 경우 사용자의 선택에 따라 스크랩만 진행하거나, 내 일정으로 등록할 수 있도록 하였다. 두 경우 모두 마이페이지의 목록에서 확인 가능하며, 내 일정으로 등록할 경우 마이페이지의 캘린더 및 구글 캘린더에 반영되도록 구현하였다. 이때, 일정 모달의 초기 정보는 공지사항의 제목과 작성일자가 각각 모달의 일정명과 시작일자에 반영되도록 구현하였다. 스크랩을 완료하면 공지사항에서는 스크랩된 항목이 표시되며, 표시된 항목을 다시 누름으로써 공지사항 스크랩을 취소할 수 있다.

📍 Jsoup 라이브러리를 활용하여 동국대학교 교내 64개의 웹 사이트를 크롤링하고 정보를 DB에 저장해두었다. 최신화를 위해서 매일 오후 7시 40분에 크롤링을 다시 진행한 후, 기존 공지사항과 카테고리 테이블을 교체한다.

📍 로그인 기능은 Spring Security를 활용한 OAuthLoginSuccessHandler 클래스를 만들어 구현하였다. 사용자 로그인 시도 시, 백 측에서 구글 리다이렉트 및 Access Token을 얻어오며 최종적으로는 사용자의 이메일을 주요 정보로 담은 Jwt Token을 프론트에 전달하며 프로세스가 종료된다.

📍 카테고리 id는 대분류 - 중분류 - 소분류의 9자리로 이루어져있다. 문과대학의 경우에는 id가 `101 101 000` 이기에, 만약 사용자가 문과대학의 모든 공지사항을 보고자 한다면 부모 카테고리 id인 `101 101`로 시작하는 카테고리의 공지사항들을 반환하게 된다. 이러한 방식으로 공지사항들을 카테고리화 하였다. 
추가적으로, 사용자가 키워드와 함께 검색하는 경우에는 부모 카테고리 id로 시작하면서 키워드를 포함하는 공지사항들만 반환한다.

---

### 학사일정 페이지

![image](https://github.com/CSID-DGU/2023-2-OSSProj-ZIIO-4/assets/113084292/593a9731-7257-45b8-81c6-d4503e9c70e3)

📍 학사일정 페이지의 왼쪽에서는, 현재 날짜를 기준으로 다음 일정들을 디데이 형태로 보여준다. 또한 일정의 시각화를 위해 Google FullCalendar 오픈소스를 이용해 캘린더 형태로 구현하였다. 사용자는 원하는 일정의 상세 정보를 달력의 일정 또는 목록을 클릭함으로써 좌측 아래와 같이 확인할 수 있다.

📍 상세 정보에서 내 일정 추가를 클릭할 경우, 공지사항의 일정 등록 기능과 동일하게 학사 일정을 내 일정으로 추가할 수 있다. 이때 마이페이지의 캘린더 뿐만 아니라 구글 캘린더에도 해당 일정이 추가된다. 학사일정은 공지사항과 다르게 별도의 URL이 없기에 입력란이 존재하지 않으며, 모달에 보이는 초기 일정명과 기간은 학사일정과 동일하게 반영되도록 구현하였다.

---

### 마이페이지

<img width="1223" alt="image" src="https://github.com/CSID-DGU/2023-2-OSSProj-ZIIO-4/assets/113084292/03294b04-4878-4b75-8075-93eecb73859b">


📍 마이페이지 왼쪽의 리스트는 로그인 된 사용자의 일정 리스트이다. 해당 리스트는 디데이 순으로 정렬되어 있으며, 이미 지난 일정은 보이지 않는다. 회색으로 표시된 일정은 기간이 정해지지 않은 일정이다.

📍 오른쪽의 달력은 사용자의 일정들이 표시된 달력이다. 각 일정은 사용자가 지정한 색깔로 표시된다.

📍 오른쪽 상단의 ʻ새 일정 추가’ 버튼을 누르면 개인 일정 추가 모달창이 나타난다. 이를 통해서 자신의 개인 일정을 마이페이지의 캘린더와 구글 캘린더에 추가할 수 있다.

📍 리스트 혹은 캘린더에서 특정 일정을 클릭할 경우 왼쪽 하단에서 일정의 상세정보를 볼 수 있다. 일정 편집 버튼을 클릭할 경우, 해당 일정을 편집하거나 삭제할 수 있다. 또한 동일하게 URL을 클릭할 시, 해당 공지사항 사이트로 바로 이동한다.

---

### 반응형

<img width="1189" alt="image" src="https://github.com/CSID-DGU/2023-2-OSSProj-ZIIO-4/assets/113084292/3c1f85e1-ea8f-464e-92ac-93340cf66267">

📍 `react-responsive`와 `미디어쿼리`, `css grid`를 사용하여 구현하였다. grid를 이용해 뷰포트의 너비에 따라 다른 열수와 행수를 지정하였다. 

---

## 프로젝트 아키텍처 🧱
![image](https://github.com/CSID-DGU/2023-2-OSSProj-ZIIO-4/assets/87259219/102a4d59-3440-4dbc-ae6f-41a0993b9671)

---

## 데이터베이스 구조 🗂️
<img src="https://github.com/CSID-DGU/2023-2-OSSProj-ZIIO-4/assets/87259219/578f71b6-bc8b-47a2-a8a9-886ea8059915" width="900" />

---

## 커밋 규칙 🔐
|작업태그|내용|
|:---:|:---:|
|Feat|	새로운 기능 추가 / 일부 코드 추가 / 일부 코드 수정(리팩토링과 구분) / 디자인 요소 수정|
|Fix|	버그 수정|
|Refactor|	코드 리팩토링|
|Style|	코드 의미에 영향을 주지 않는 변경사항(코드 포맷팅, 오타 수정, 변수명 변경, 에셋 추가)|
|Chore|	빌드 부분 혹은 패키지 매니저 수정 사항, 파일 이름 변경 및 위치 변경, 파일 삭제

---

## HTTP 상태코드 🚨

|상태코드|설명|
|:---:|:---:|
|200 OK|	클라이언트의 요청 정상 수행|
|201 Created|	POST를 통한 리소스 생성 시, 해당 리소스가 클라이언트의 요청에 맞게 성공적으로 생성|
|400 Bad Request|	클라이언트의 요청이 부적절한 경우|
|401 Unauthorized|	클라이언트가 인증되지 않은 상태에서, 보호된 리소스를 요청했을 때|
|404 Not Found|	클라이언트가 서버와 통신할 수는 있지만, 서버가 요청한 바를 찾을 수 없을 때|
|405 Method Not Allowed|	클라이언트가 요청한 리소스에서는 사용 불가능한 메소드를 이용했을 때|
|409 Conflict|	클라이언트가 중복 등록을 시도했을 때|
|500 Internal Server Error|	서버가 처리 방법을 모를 때|

---

## 실행 순서 💡
### Frontend
1. `npm install`
2. `npm start`

### Backend
1. `cd 2023-2-OSSProj-ZIIO-4/backend/build/libs`
2. `java -jar backend-0.0.1-SNAPSHOT.jar`
