import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';

import listIcon from '../../assets/icons/list.svg';
import closeIcon from '../../assets/icons/close.svg';

import styles from './MainNotice.module.scss';
import ClipModal from '../../components/ClipModal/ClipModal';
import LoginModal from '../../components/LoginModal/LoginModal';
import DropDownComp from '../../components/DropDownComp/DropDownComp';

import loading from '../../assets/images/Loding.gif';
import sampleCategories, { categoryList } from '../../utils/category';
import { FaStar } from 'react-icons/fa';
import UserCategory from '../../components/UserCategory/UserCategory';
import Pagging from '../../components/Pagging/Pagging';
import { EventModal } from '../../components';
import { useNavigate } from 'react-router-dom';
import {
  addBookmark,
  addEventsScraps,
  deleteBookmark,
  deleteScraps,
  getBookmark,
  getNotice,
  getScraps,
  getSearchNotice,
} from '../../api/userAPI';
import { useMediaQuery } from 'react-responsive';

function MainNotice() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false); // 모바일 전용 즐겨찾기 공지사항 열기
  const [categoryIdList, setCategoryIdList] = useState([]); // db에서 카테고리 id 전달 받기

  const [isLogin, setIsLogin] = useState(() => {
    const isToken = localStorage.getItem("ziio-token");
    if (isToken) return true;
    else return false
  });
  const [isOpen, setIsOpen] = useState(false);
  const [isScraps, setIsScraps] = useState(false);
  const [isButton, setIsButton] = useState(false);
  const [isOpenEventModal, setIsOpenEventModal] = useState(false);

  const [category1, setCategory1] = useState('메인');
  const [category2, setCategory2] = useState('일반공지');
  const [category3, setCategory3] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // 검색어

  // 검색 결과 notices
  const [noticeList, setNoticeList] = useState([]);

  // 검색 기록 or 즐겨찾기
  const [searchCategories, setSearchCategories] = useState([]); // 검색 기록
  const [bookmarkCategories, setBookmarkCategories] = useState([]); // 즐겨찾기
  const [scrapsList, setScrapsList] = useState([]); // 스크랩

  // 공지 스크랩
  const [selectedNotice, setSelectedNotice] = useState([]); // focus된 공지 index
  const [selectedCategory, setSelectedCategory] = useState('100100000'); // focus된 공지 index

  const noticeQuery = useQuery('noticeData', getNotice);
  const bookmarksQuery = useQuery('bookmarksData', getBookmark, {
    enabled: !!isLogin
  });

  const scrapsQuery = useQuery('scrapsData', getScraps, {
    enabled: !!isLogin
  });
  const navigate = useNavigate();

  useEffect(() => {
    const isSessionData = sessionStorage.getItem('searchCategories');
    const parseExistingData = isSessionData
      ? JSON.parse(isSessionData)
      : sessionStorage.setItem('searchCategories', JSON.stringify([]));
    setSearchCategories(parseExistingData);
    const isToken = localStorage.getItem('ziio-token');
    if (isToken) setIsLogin(true);
  }, []);

  useEffect(() => {
    if (noticeList.length === 0 && noticeQuery && noticeQuery.data) {
      setBookmarkCategories([]);
      const { data } = noticeQuery;
      if (Array.isArray(data.notices)) {
        const formattedNotices = noticeFormat(data.notices);
        setNoticeList(formattedNotices);
      }
      if (Array.isArray(data.categories)) {
        setCategoryIdList(data.categories);
      }
    }
  }, [noticeQuery, noticeList]);

  useEffect(() => {
    if (bookmarksQuery && bookmarksQuery.data) {
      const { data } = bookmarksQuery;
      if (Array.isArray(data)) {
        data.forEach((item) => {
          const isDuplicate = bookmarkCategories.some(existingCategory => existingCategory.id === item.category_id);
          if (!isDuplicate) {
            const selectedCategory = (categoryList.filter((category) => category.name === item.category_name)[0]?.categoryList) || [];
            const result = {
              name: item.category_name,
              url: {
                category1: selectedCategory[0],
                category2: selectedCategory[1],
                category3: selectedCategory[2],
              },
              id: item.category_id
            }
            setBookmarkCategories((prev) => [...prev, result]);
          }
        })
      }
    }
  }, [bookmarksQuery]);

  useEffect(() => {
    if (scrapsQuery && scrapsQuery.data) {
      const { data } = scrapsQuery;
      if (Array.isArray(data)) {
        setScrapsList(data);
      }
    }
  }, [scrapsQuery]);

  useEffect(() => {
    if (Array.isArray(scrapsList)) {
      const formattedNotices = noticeFormat(noticeList, scrapsList);
      setNoticeList(formattedNotices);
    }
  }, [scrapsList]);

  useEffect(() => {
    if (bookmarkCategories.length !== 0) {
      const req = bookmarkCategories.some(item => item.id === selectedCategory)
      if (req) setIsButton(true);
      else setIsButton(false);
    }
  }, [noticeList, bookmarkCategories]);

  const handleCategories1Change = e => {
    setCategory1(e.target.value);
    setCategory2(''); // 중분류 초기화
    setCategory3(''); // 소분류 초기화
  };

  const handleCategories2Change = e => {
    setCategory2(e.target.value);
    setCategory3(''); // 소분류 초기화
  };

  const noticeFormat = (data, scraps) => {
    if (Array.isArray(data) && data.length !== 0) {
      const newArray = data.map((item) => {
        const words = item.title.split(' ');
        if (words.length > 0 && item.notice_id === null) {
          if (words[0].includes("공지")) {
            const restOfWords = words.slice(1);
            item.title = restOfWords.join(' ');
          }
          item.fixed = item.notice_id === null ? true : false;
        }
        if (scraps && Array.isArray(scraps)) {
          item.isClip = scraps.some((clip) => clip.id === item.id);
        } else {
          item.isClip = false;
        }
        return item;
      });
      return newArray;
    }
    return [];
  };

  const categotyIdSearch = (category1, category2, category3) => {
    let searchCategory = category3 || category2 || category1;
    if (searchCategory === '') {
      searchCategory = category2 || category1;
      const result =
        categoryIdList.filter(cat => cat.name === searchCategory).length !== 0
          ? categoryIdList.filter(cat => cat.name === searchCategory)[0].category_id
          : [];
      setSelectedCategory(result);
      return result;
    } else {
      const result =
        categoryIdList.filter(cat => cat.name === searchCategory).length !== 0
          ? categoryIdList.filter(cat => cat.name === searchCategory)[0].category_id
          : [];
      setSelectedCategory(result);
      return result;
    }
  };

  // 사용자 검색 기능
  const handleSearch = async () => {
    let searchResult;
    const nowCategoryId = categotyIdSearch(category1, category2, category3);
    try {
      if (searchQuery === "") searchResult = await getSearchNotice(nowCategoryId, "");
      else searchResult = await getSearchNotice(nowCategoryId, searchQuery);
      if (searchResult !== "error") {
        const formattedNotices = noticeFormat(searchResult, scrapsList);
        setNoticeList(formattedNotices);
      }
      else alert("검색을 다시 시도해주세요.");
    } catch (error) {
      console.log(error);
      alert("검색 중 오류가 발생했습니다.");
    } finally {
      addSearchList();
    }
  };

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
  const deleteSearchList = id => {
    const existingData = sessionStorage.getItem('searchCategories');
    const parseExistingData = existingData ? JSON.parse(existingData) : [];
    const updatedData = parseExistingData.filter(item => item.id !== id);
    sessionStorage.setItem('searchCategories', JSON.stringify(updatedData));
    setSearchCategories(updatedData);
  };

  // 즐겨찾기
  // 즐겨찾기 추가
  const handleAddBookmark = async () => {
    if (!isLogin) alert('로그인이 필요한 기능입니다.');
    else {
      if (category1 || category2 || category3) {
        const result = await addBookmark(selectedCategory);
        if (result && result.category_id) {
          const newBookmark = {
            name: category3 || category2,
            url: {
              category1,
              category2,
              category3,
            },
            id: result.category_id,
          };
          setBookmarkCategories(prev => {
            if (!prev.some(category => category.id === newBookmark.id)) return [...prev, newBookmark];
            return prev;
          });
        }
      }
    }
  };

  // 즐겨찾기 삭제(db에 id 전달)
  const handleDeleteBookmark = async id => {
    const result = await deleteBookmark(id);
    if (result === 'fail') alert('해당 카테고리는 즐겨찾기로 등록되지 않은 카테고리입니다.');
    else if (result === 'error') alert('즐겨찾기 삭제를 다시 시도해주세요.');
    else {
      const newArray = bookmarkCategories.filter(item => item.id !== result);
      setBookmarkCategories(newArray);
    };
  }

  // 기록에서 검색
  const ListSearch = async (value) => {
    const SearchData = await getSearchNotice(value.id, "");
    if (SearchData === "error") alert("검색을 다시 시도해주세요.");
    else {
      const formattedNotices = noticeFormat(SearchData);
      setNoticeList(formattedNotices);
      setCategory1(value.url.category1);
      setCategory2(value.url.category2);
      setCategory3(value.url.category3);
      reloadScraps();
    };
  }

  // 스크랩
  const changeClipStarNotice = item => {
    if (!isLogin) alert('로그인이 필요한 기능입니다');
    else {
      if (item.type === "add") {
        setIsOpen(!isOpen);
        setSelectedNotice(item.value);
        setSelectedCategory(item.value.category_id);
      }
      else {
        const result = deleteScraps({ notice_id: item.value.notice_id, category_id: item.value.category_id })
        if (result === "success") { alert("스크랩이 취소되었습니다"); }
      }
    }
  };

  // 스크랩 재실행 
  const reloadScraps = async (data) => {
    if (Array.isArray(data)) {
      console.log("제발", data);
      setScrapsList([...data]);
    }
  }

  // 일정 등록
  const saveEvent = async eventData => {
    if (eventData.end) {
      const endDate = new Date(eventData.end);
      endDate.setHours(23, 59, 59, 999); // 날짜의 시간을 23:59:59.999로 설정
      eventData.end = endDate;
    }

    const resultData = {
      notice_id: eventData.id,
      start_date: dayjs(eventData.start).format('YYYY.MM.DD'),
      end_date: dayjs(eventData.end).format('YYYY.MM.DD'),
      category_id: selectedCategory,
      title: eventData.title,
      memo: eventData.extendedProps.memo === undefined ? null : eventData.extendedProps.memo,
      url: eventData.url,
      color_code: eventData.backgroundColor,
    };

    const EventsData = addEventsScraps(resultData);
    try {
      const result = await EventsData;
      if (result === "success") {
        const response = window.confirm("저장된 내 일정을 확인하기 위해 마이페이지로 이동하시겠습니까?")
        if (response) navigate('/myPage')
      }
    } catch (error) {
      console.error('Error:', error);
    }
    setIsOpenEventModal(!isOpenEventModal);
  };

  return (
    <div className={styles.container}>
      <div className={styles.userContainer} style={{ display: isBookmarkOpen || !isMobile ? 'block' : 'none' }}>
        {isLogin ? (
          <div>
            <img
              src={closeIcon}
              alt="즐겨찾기 공지사항 닫기"
              onClick={() => setIsBookmarkOpen(false)}
              className={styles.closeButton}
              style={{
                display: isBookmarkOpen && isMobile ? 'block' : 'none',
              }}
            />
            <div className={styles.text1}>즐겨찾기 공지사항</div>
            <UserCategory categoryList={bookmarkCategories} onClick={ListSearch} onDelete={handleDeleteBookmark} />
          </div>
        ) : (
          <div>
            <div className={styles.text1}>검색한 공지사항</div>
            <UserCategory categoryList={searchCategories} onClick={ListSearch} onDelete={deleteSearchList} />
          </div>
        )}
      </div>

      <div className={styles.noticeContainer}>
        <div className={styles.filterContainer}>
          <div className={styles.filterWrapper}>
            <DropDownComp
              placeholder="대분류"
              data={sampleCategories}
              fillterData={[category1, category2, category3]}
              onChange={e => handleCategories1Change(e)}
            />
            <DropDownComp
              placeholder="중분류"
              data={sampleCategories}
              fillterData={[category1, category2, category3]}
              onChange={e => handleCategories2Change(e)}
            />
            <DropDownComp
              placeholder="소분류"
              data={sampleCategories}
              fillterData={[category1, category2, category3]}
              onChange={e => setCategory3(e.target.value)}
            />
            <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            <button className={styles.searchButton} onClick={handleSearch}>
              검색
            </button>
            {isMobile && (
              <>
                <button className={styles.bookmarkButton} onClick={handleAddBookmark}>
                  <FaStar size={15} className={styles.star} />
                  <div>즐겨찾기에 추가</div>
                </button>
                {isLogin && (
                  <button className={styles.bookmarkListButton} onClick={() => setIsBookmarkOpen(!isBookmarkOpen)}>
                    <img src={listIcon} alt="즐겨찾기 공지사항" style={{ marginRight: '0.3rem' }} />
                    즐겨찾기 카테고리 목록
                  </button>
                )}
              </>
            )}
          </div>
          {!isMobile && (
            <button className={styles.bookmarkButton} style={isButton ? { opacity: 0.5 } : {}} onClick={handleAddBookmark} disabled={isButton}>
              <FaStar size={15} className={styles.star} />
              <div>즐겨찾기에 추가</div>
            </button>
          )}
        </div>

        <div className={styles.itemList}>
          {noticeQuery.isLoading ? (
            <div className={styles.loadingContainer}>
              <img className={styles.loadingImage} src={loading} alt="공지사항을 불러오는 중입니다" />
              <div className={styles.loadingText}>공지사항을 불러오는 중입니다.</div>
            </div>
          ) : (
            <Pagging
              data={noticeList}
              noticeCategory={categoryIdList}
              changeClipStarNotice={item => changeClipStarNotice(item)}
            />
          )}
        </div>
      </div>

      {!isLogin
        ? isOpen && <LoginModal onModalClose={() => setIsOpen(!isOpen)} />
        : isOpen && (
          <ClipModal
            noticeId={selectedNotice.notice_id}
            categoryId={selectedCategory}
            onModalClose={() => setIsOpen(!isOpen)}
            openEventModal={() => {
              setIsOpen(!isOpen);
              setIsOpenEventModal(!isOpenEventModal);
            }}
            onScrapsData={(data) => reloadScraps(data)}
          />
        )}
      {isOpenEventModal && (
        <EventModal
          modalTitle={'내 일정으로 추가'}
          eventId={selectedNotice.notice_id}
          prevData={{
            title: selectedNotice.title,
            start: selectedNotice.date_posted,
            url: selectedNotice.url,
          }}
          saveEvent={saveEvent}
          closeModal={() => setIsOpenEventModal(!isOpenEventModal)}
        />
      )}
    </div>
  );
}

export default MainNotice;
