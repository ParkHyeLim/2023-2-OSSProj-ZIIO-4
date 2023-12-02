import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import styles from './MainNotice.module.scss';
import ClipModal from '../../components/ClipModal/ClipModal';
import LoginModal from '../../components/LoginModal/LoginModal';
import DropDownComp from '../../components/DropDownComp/DropDownComp';

import sampleCategories from '../../utils/category';
import { FaStar } from 'react-icons/fa';
import instance from '../../api/instance';
import UserCategory from '../../components/UserCategory/UserCategory';
import Pagging from '../../components/Pagging/Pagging';

const fetchProjects = async (categoryId, keyword) => {
  if (categoryId !== "") {
    const { data } = await instance.get(`/notices/search?category_id=${categoryId}&keyword=${keyword !== "" ? keyword : ""}`);
    return data;
  } else {
    const { data } = await instance.get('/notices');
    return data;
  }
}

const sample2 = [
  {
    name: '불교학과',
    url: ['단과대', '불교학부', '불교학과'],
  },
  {
    name: '사학과',
    url: ['단과대', '문과대학', '사학과'],
  },
];

function MainNotice() {
  const [categoryIdList, setCategoryIdList] = useState([]); // db에서 카테고리 id 전달 받기
  const [isClickedStar, setIsClickedStar] = useState([false]);

  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearch, setIsSearch] = useState(true); // 검색 버튼 활성화/비활성화

  const [category1, setCategory1] = useState('메인');
  const [category2, setCategory2] = useState('일반공지');
  const [category3, setCategory3] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // 검색어

  // 검색 결과 notices
  const [noticeList, setNoticeList] = useState([]);
  const [topNoticeList, setTopNoticeList] = useState([]);

  // 검색 기록 or 즐겨찾기
  const [searchCategories, setSearchCategories] = useState([]); // 검색 기록
  const [bookmarkCategories, setBookmarkCategories] = useState(sample2); // 즐겨찾기

  // 공지 스크랩
  const [focusIndex, setFocusIndex] = useState(0); // focus된 공지 index

  const { data } = useQuery('notices', () => fetchProjects("", ""));

  useEffect(() => {
    if (data) {
      console.log(data);
      setCategoryIdList(data.categories);
      const formattedNotices = noticeFormat(data.notices);
      setNoticeList(formattedNotices);
      setIsClickedStar(Array(noticeList.length).fill(false));
    }
  }, [data]);

  const noticeFormat = (data) => {
    const newArray = data;
    newArray.map((item) => {
      const words = item.title.split(' ');
      if (words.length > 0 && words[0].startsWith("공지")) {
        const restOfWords = words.slice(1);
        item.title = restOfWords.join(' ');
        item.fixed = true;
        // setTopNoticeList((prevList) => {
        //   const isDuplicate = prevList.some((existingItem) => existingItem.id === item.id);
        //   if (!isDuplicate) { return [...prevList, item]; }
        //   else { return prevList; }
        // });
      }
    })
    return newArray;
  }

  const handleCategories1Change = e => {
    setCategory1(e.target.value);
    setCategory2(''); // 중분류 초기화
    setCategory3(''); // 소분류 초기화
  };

  const handleCategories2Change = e => {
    setCategory2(e.target.value);
    setCategory3(''); // 소분류 초기화
  };

  const categotyIdSearch = (category1, category2, category3) => {
    let searchCategory = category3 || category2 || category1;
    if (searchCategory === "") {
      searchCategory = category2 || category1;
      return categoryIdList.filter((cat) => cat.name === searchCategory).length !== 0 ? categoryIdList.filter((cat) => cat.name === searchCategory)[0].category_id : [];
    } else {
      return categoryIdList.filter((cat) => cat.name === searchCategory).length !== 0 ? categoryIdList.filter((cat) => cat.name === searchCategory)[0].category_id : [];
    }
  }

  // 사용자 검색 기능
  const handleSearch = async () => {
    const nowCategoryId = categotyIdSearch(category1, category2, category3);
    let SearchData;
    if (searchQuery === "") SearchData = fetchProjects(nowCategoryId, "");
    else SearchData = fetchProjects(nowCategoryId, searchQuery)
    try {
      const result = await SearchData; // Promise가 완료되고 해결될 때까지 대기하고 결과를 얻습니다.
      const formattedNotices = noticeFormat(result)// 이제 result에 PromiseResult가 들어 있습니다.
      setNoticeList(formattedNotices);
    } catch (error) {
      console.error('Error:', error);
    }
    if (!isLogin) {
      addSearchList();
    }
  };

  // 검색 기록(세션 불러오기)
  useEffect(() => {
    const isSessionData = sessionStorage.getItem('searchCategories');
    const parseExistingData = isSessionData
      ? JSON.parse(isSessionData)
      : sessionStorage.setItem('searchCategories', JSON.stringify([]));
    setSearchCategories(parseExistingData);
  }, []);

  // 검색 기록 (세션에 저장)
  const addSearchList = () => {
    if (category1 || category2 || category3) {
      const categoryId = categotyIdSearch(category1, category2, category3);
      const newSearch = {
        name: category3 || category2,
        url: {
          category1,
          category2,
          category3,
        },
        id: categoryId,
      };

      const existingData = sessionStorage.getItem('searchCategories');
      const parseExistingData = existingData ? JSON.parse(existingData) : [];
      const isExist = parseExistingData.some(filter => filter.id === newSearch.id);

      if (!isExist) {
        parseExistingData.push(newSearch);
        sessionStorage.setItem('searchCategories', JSON.stringify(parseExistingData));
        setSearchCategories(parseExistingData);
      }
    }
  };

  // 검색 기록 삭제 (세션에서 내용 지우기)
  const deleteSearchList = (id) => {
    const existingData = sessionStorage.getItem('searchCategories');
    const parseExistingData = existingData ? JSON.parse(existingData) : [];
    const updatedData = parseExistingData.filter(item => item.id !== id);
    sessionStorage.setItem('searchCategories', JSON.stringify(updatedData));
    setSearchCategories(updatedData);
  }

  // 검색 기록에서 검색
  const SearchListSearch = async (value) => {
    const SearchData = fetchProjects(value.id, "");
    try {
      const result = await SearchData; // Promise가 완료되고 해결될 때까지 대기하고 결과를 얻습니다.
      const formattedNotices = noticeFormat(result)// 이제 result에 PromiseResult가 들어 있습니다.
      setNoticeList(formattedNotices);
    } catch (error) {
      console.error('Error:', error);
    }
    if (searchQuery === "") {
      const SearchData = fetchProjects(value.id, "");

      try {
        const result = await SearchData; // Promise가 완료되고 해결될 때까지 대기하고 결과를 얻습니다.
        const formattedNotices = noticeFormat(result)// 이제 result에 PromiseResult가 들어 있습니다.
        setNoticeList(formattedNotices);
      } catch (error) {
        console.error('Error:', error);
      }

    } else {
      const SearchData = fetchProjects(value.id, searchQuery);
      const formattedNotices = noticeFormat(SearchData);
      // setNoticeList(formattedNotices);
    }
    setCategory1(value.url.category1);
    setCategory2(value.url.category2);
    setCategory3(value.url.category3);
  }

  // 스크랩
  const changeClipStarList = idx => {
    setIsClickedStar(prevIsStarred => {
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
        const hasDuplicate = bookmarkCategories.some(bookmark => bookmark.name === newBookmark.name);
        if (!hasDuplicate) {
          // 같은 이름이 없는 경우에만 추가
          setBookmarkCategories([...bookmarkCategories, newBookmark]);
        }
      }
    }
  };

  // 즐겨찾기 삭제(db에 id 전달)
  const handleDeleteBookmark = title => {
    if (isLogin) {
      const updatedBookmarkCategories = bookmarkCategories.filter(bookmark => bookmark.name !== title);
      setBookmarkCategories(updatedBookmarkCategories);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.userContainer}>
        {isLogin ? (
          <div>
            <div className={styles.text1}>즐겨찾기 공지사항</div>
            <UserCategory categoryList={bookmarkCategories}
              onClick={SearchListSearch}
              onDelete={deleteSearchList}
            />
          </div>
        ) : (
          <div>
            <div className={styles.text1}>검색한 공지사항</div>
            <UserCategory categoryList={searchCategories}
              onClick={SearchListSearch}
              onDelete={deleteSearchList}
            />
          </div>
        )}
      </div>

      <div className={styles.noticeContainer}>
        <div className={styles.fillterContainer}>
          <div>
            <DropDownComp
              placeholder="대분류"
              data={sampleCategories}
              fillterData={[category1, category2, category3]}
              onChange={e => handleCategories1Change(e)} />
            <DropDownComp
              placeholder="중분류"
              data={sampleCategories}
              fillterData={[category1, category2, category3]}
              onChange={e => handleCategories2Change(e)} />
            <DropDownComp
              placeholder="소분류"
              data={sampleCategories}
              fillterData={[category1, category2, category3]}
              onChange={e => setCategory3(e.target.value)} />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            <button className={styles.searchButton} onClick={handleSearch} disabled={!isSearch}>
              검색
            </button>
          </div>

          <button className={styles.bookmarkButton} onClick={handleAddBookmark}>
            <FaStar size={15} className={styles.star} />
            <div>즐겨찾기에 추가</div>
          </button>
        </div>

        <div className={styles.itemList}>
          <Pagging data={noticeList} noticeCategory={categoryIdList} isClickedStar={isClickedStar} changeClipStarList={idx => changeClipStarList(idx)} />
        </div>
      </div>

      {/* <button onClick={() => setIsOpen(!isOpen)}>open</button> */}
      {isLogin
        ? isOpen && <LoginModal onModalClose={() => setIsOpen(!isOpen)} />
        : isOpen && <ClipModal onModalClose={() => setIsOpen(!isOpen)} />}
    </div>
  );
}

export default MainNotice;
