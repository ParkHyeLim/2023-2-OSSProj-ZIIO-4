import React, { useEffect, useState } from "react";

import styles from './MainNotice.module.scss'
import BookmarkCategory from "../../components/UserCategory/UserCategory";
import ClipModal from "../../components/ClipModal/ClipModal";
import LoginModal from "../../components/LoginModal/LoginModal";
import { FaStar } from "react-icons/fa";
import DropDownComp from "../../components/DropDownComp/DropDownComp";

import sampleCategories from "../../util/category";
import NoticeItem from "../../components/NoticeItem/NoticeItem";

const sample = [
  {
    name: "일반공지", url: [
      '메인',
      '일반공지',
      '',
    ],
  },
  {
    name: "학사공지", url: [
      '메인',
      '학사공지',
      '',
    ],
  }
];

const sample2 = [
  {
    name: "불교학과", url: [
      '단과대',
      '불교학부',
      '불교학과',
    ],
  },
  {
    name: "사학과", url: [
      '단과대',
      '문과대학',
      '사학과',
    ],
  }
];

const Data = [
  {
    announcement_id: '공지', category_id: 0, announcement_title: '[교과연계 협력학습] DoDream 학습동아리 최종 선정 팀 발표',
    "announcement_url": "https://www.dongguk.edu/article/GENERALNOTICES/detail/26751176", announcement_date_posted: '2023. 09. 21', announcement_author: '나윤주'
  },
  {
    announcement_id: '공지', category_id: 0, announcement_title: '[교과연계 협력학습] DoDream 학습동아리 최종 선정 팀 발표',
    "announcement_url": "https://www.dongguk.edu/article/GENERALNOTICES/detail/26751176", announcement_date_posted: '2023. 09. 21', announcement_author: '나윤주'
  },
  {
    announcement_id: '공지', category_id: 1, announcement_title: '[교과연계 협력학습] DoDream 학습동아리 최종 선정 팀 발표',
    "announcement_url": "https://www.dongguk.edu/article/GENERALNOTICES/detail/26751176", announcement_date_posted: '2023. 09. 21', announcement_author: '나윤주'
  },
  {
    announcement_id: '공지', category_id: 2, announcement_title: '[교과연계 협력학습] DoDream 학습동아리 최종 선정 팀 발표',
    "announcement_url": "https://www.dongguk.edu/article/GENERALNOTICES/detail/26751176", announcement_date_posted: '2023. 09. 21', announcement_author: '나윤주'
  },
  {
    announcement_id: '1', category_id: 3, announcement_title: '[교과연계 협력학습] DoDream 학습동아리 최종 선정 팀 발표',
    "announcement_url": "https://www.dongguk.edu/article/GENERALNOTICES/detail/26751176", announcement_date_posted: '2023. 09. 21', announcement_author: '나윤주'
  },
  {
    announcement_id: '2', category_id: 1, announcement_title: '[교과연계 협력학습] DoDream 학습동아리 최종 선정 팀 발표',
    "announcement_url": "https://www.dongguk.edu/article/GENERALNOTICES/detail/26751176", announcement_date_posted: '2023. 09. 21', announcement_author: '나윤주'
  },
  {
    announcement_id: '3', category_id: 2, announcement_title: '[교과연계 협력학습] DoDream 학습동아리 최종 선정 팀 발표',
    "announcement_url": "https://www.dongguk.edu/article/GENERALNOTICES/detail/26751176", announcement_date_posted: '2023. 09. 21', announcement_author: '나윤주'
  },
]

function MainNotice() {
  const [categoryId, setCategoryId] = useState([{}]); // db에서 카테고리 id 전달 받기
  const [filteredContents, setFilteredContents] = useState([{}]); // db에서 필터된 공지사항 전달 받기(첫: 메인-일반공지)
  const [isClickedStar, setIsClickedStar] = useState(
    Array(Data.length).fill(false) // 초기 상태는 모두 false // db랑 연동되면 북마크 사항 반영
  )

  const [isLogin, setIsLogin] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(true); // 검색 버튼 활성화/비활성화

  const [category1, setCategory1] = useState('');
  const [category2, setCategory2] = useState('');
  const [category3, setCategory3] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // 검색어

  // 검색 기록 or 즐겨찾기
  const [searchCategories, setSearchCategories] = useState([]); // 검색 기록
  const [bookmarkCategories, setBookmarkCategories] = useState(sample2); // 즐겨찾기

  // 공지 스크랩
  const [focusIndex, setFocusIndex] = useState(0);// focus된 공지 index


  const handleCategories1Change = (e) => {
    setCategory1(e.target.value);
    setCategory2(''); // 중분류 초기화
    setCategory3(''); // 소분류 초기화
  };

  const handleCategories2Change = (e) => {
    setCategory2(e.target.value);
    setCategory3(''); // 소분류 초기화
  };

  const handleSearch = () => { // 백으로 정보 보낼 함수
    console.log([category1, category2, category3, searchQuery])
    if (!isLogin) {
      addSearchList();
    }
  }

  // 스크랩
  const changeClipStarList = (idx) => {
    setIsClickedStar((prevIsStarred) => {
      const updatedIsStarred = [...prevIsStarred];
      updatedIsStarred[idx] = !prevIsStarred[idx];
      return updatedIsStarred;
    });
    setFocusIndex(idx);
    setIsOpen(!isOpen);
  };

  // 즐겨찾기
  // 즐겨찾기 추가 
  const handleAddBookmark = () => {
    console.log(bookmarkCategories);
    if (category1 || category2 || category3) {
      const newBookmark = {
        name: category3 || category2,
        url: {
          category1,
          category2,
          category3,
        },
      };

      // 같은 이름을 가진 항목이 이미 있는지 확인
      if (isLogin) {
        const hasDuplicate = bookmarkCategories.some((bookmark) => bookmark.name === newBookmark.name);
        if (!hasDuplicate) {
          // 같은 이름이 없는 경우에만 추가
          setBookmarkCategories([...bookmarkCategories, newBookmark]);

        }
      }
    }
  };

  // 즐겨찾기 삭제(db에 id 전달)
  const handleDeleteBookmark = (title) => {
    if (isLogin) {
      const updatedBookmarkCategories = bookmarkCategories.filter((bookmark) => bookmark.name !== title);
      setBookmarkCategories(updatedBookmarkCategories);
    }
  }

  // 검색 기록(세션 불러오기)
  useEffect(() => {
    // sessionStorage.clear();
    const isSessionData = sessionStorage.getItem('searchCategories');
    const parseExistingData = isSessionData ? JSON.parse(isSessionData) : sessionStorage.setItem('searchCategories', JSON.stringify([]));
    setSearchCategories(parseExistingData);
  }, []);


  // 검색 기록 (세션에 저장)
  const addSearchList = () => {
    if (category1 || category2 || category3) {
      const newSearch = {
        name: category3 || category2,
        url: {
          category1,
          category2,
          category3,
        },
      };

      // 세션에서 데이터를 가져온 뒤, 같은 이름이 없는지 확인
      const existingData = sessionStorage.getItem('searchCategories');
      const parseExistingData = existingData ? JSON.parse(existingData) : [];

      // 같은 이름을 가진 항목이 이미 있는지 확인
      const isExist = parseExistingData.some((filter) => filter.name === newSearch.name);

      if (!isExist) {
        // 새로운 검색을 기존 데이터에 추가
        parseExistingData.push(newSearch);

        // 세션에 업데이트된 데이터 저장
        sessionStorage.setItem('searchCategories', JSON.stringify(parseExistingData));

        // 업데이트된 검색 기록 상태 설정
        setSearchCategories(parseExistingData);
      }
    }
  };

  return (
    <div className={styles.container}>

      <div className={styles.userContainer}>
        {isLogin ? (
          <div>
            <div className={styles.text1}>즐겨찾기 공지사항</div>
            <BookmarkCategory categoryList={bookmarkCategories} />
          </div>
        ) : (
          <div>
            <div className={styles.text1}>검색한 공지사항</div>
            <BookmarkCategory categoryList={searchCategories} />
          </div>
        )}
      </div>

      <div className={styles.noticeContainer}>
        <div className={styles.fillterContainer}>
          <DropDownComp placeholder="대분류" data={sampleCategories} fillterData={[category1, category2, category3]} onChange={(e) => handleCategories1Change(e)}></DropDownComp>
          <DropDownComp placeholder="중분류" data={sampleCategories} fillterData={[category1, category2, category3]} onChange={(e) => handleCategories2Change(e)}></DropDownComp>
          <DropDownComp placeholder="소분류" data={sampleCategories} fillterData={[category1, category2, category3]} onChange={(e) => setCategory3(e.target.value)}></DropDownComp>
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className={styles.searchButton} onClick={handleSearch} disabled={!isSearch}>
            검색
          </button>
          <button className={styles.bookmarkButton} onClick={handleAddBookmark}>
            <FaStar style={{ color: '#FCD34D' }} />
            즐겨찾기 추가
          </button>
        </div>

        <div>
          {Data.map((value, index) => (
            <NoticeItem item={value} idx={index} clipStar={isClickedStar} onStarClick={(idx) => changeClipStarList(idx)} />
          ))}
        </div>
      </div>

      {/* <button onClick={() => setIsOpen(!isOpen)}>open</button> */}
      {isLogin ? (
        isOpen && (
          <LoginModal onModalClose={() => setIsOpen(!isOpen)} />
        )
      ) : (
        isOpen && (
          <ClipModal onModalClose={() => setIsOpen(!isOpen)} />
        )
      )}

    </div>
  );
}

export default MainNotice;