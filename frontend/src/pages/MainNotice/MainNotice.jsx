import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

import styles from './MainNotice.module.scss';
import ClipModal from '../../components/ClipModal/ClipModal';
import LoginModal from '../../components/LoginModal/LoginModal';
import DropDownComp from '../../components/DropDownComp/DropDownComp';

import sampleCategories, { categoryList } from '../../utils/category';
import { FaStar } from 'react-icons/fa';
import instance from '../../api/instance';
import UserCategory from '../../components/UserCategory/UserCategory';
import Pagging from '../../components/Pagging/Pagging';
import { EventModal } from '../../components';
import { useNavigate } from 'react-router-dom';

const fetchProjects = async (type, value1, value2) => {
  let response;
  switch (type) {
    case "search":
      response = await instance.get(`/notices/search?category_id=${value1}&keyword=${value2 !== "" ? value2 : ""}`);
      return response.data;
    case "addBookmark":
      response = await instance.post(`/bookmarks`, { "category_id": value1 });
      return response.data;
    case "deleteBookmark":
      response = await instance.delete(`/bookmarks`, { data: { "category_id": value1 } });
      return response.data;
    case "getScraps":
      response = await instance.get('/scraps');
      return response.data;
    case "addEventsScraps":
      response = await instance.post(`/scraps`, value1);
      return response.data;
    case "deleteScraps":
      response = await instance.delete(`/notices/scraps`, value1);
      return response.data;
    default:
      response = await instance.get('/notices');
      const getBookmarkList = await instance.get('/bookmarks');
      const getScrapsList = await instance.get('/scraps');
      return { ...response.data, bookmarks: getBookmarkList.data, scraps: getScrapsList.data };
  }
};

const addBookmark = async (id) => {
  const bookmarkData = fetchProjects("addBookmark", id, "");
  try {
    const result = await bookmarkData;
    if (result.message === "successfully created.") return result;
  } catch (error) {
    if (error.response.data === "This category is already added to the Bookmark.") return "fail";
  }
}

const deleteBookmark = async (id) => {
  const bookmarkData = fetchProjects("deleteBookmark", id, "");
  try {
    const result = await bookmarkData;
    if (result.message === "successfully removed.") return id;
    console.log(result);
  } catch (error) {
    if (error.response.data === "This category does not exist in the Bookmark.") return "fail";
  }
}

const getScraps = async () => {
  const scrapsData = fetchProjects("getScraps", "", "");
  try {
    const result = await scrapsData;
    if (result) return result;
  } catch (error) {
    if (error.response.data === "Notice ID and Category ID cannot be null") return "fail";
  }
}

const deleteScraps = async (item) => {
  const scrapsData = fetchProjects("deleteScraps", item, "");
  try {
    const result = await scrapsData; // Promise가 완료되고 해결될 때까지 대기하고 결과를 얻습니다.
    if (result.message === "successfully remove") return "success";
    else console.log(result);
  } catch (error) {
    console.log(error);
    return "error";
  }
}

const addEventsScraps = async (item) => {
  const scrapsData = fetchProjects("addEventsScraps", item, "");
  try {
    const result = await scrapsData; // Promise가 완료되고 해결될 때까지 대기하고 결과를 얻습니다.
    if (result.message === "successfully remove") return "success";
    else console.log(result);
  } catch (error) {
    console.log(error);
    return "error";
  }
}

// const clipSample = [{ notice_id: "123", category_id: "100100000" }];

function MainNotice() {
  const [categoryIdList, setCategoryIdList] = useState([]); // db에서 카테고리 id 전달 받기

  const [isLogin, setIsLogin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
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

  // 공지 스크랩
  const [selectedNotice, setSelectedNotice] = useState([]); // focus된 공지 index
  const [selectedCategory, setSelectedCategory] = useState("100100000"); // focus된 공지 index

  const { data } = useQuery('notices', () => fetchProjects("", "", ""));
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
    if (data) {
      setCategoryIdList(data.categories);
      const formattedNotices = noticeFormat(data.notices, data.scraps);
      setNoticeList(formattedNotices);
      const getBookmarkData = data.bookmarks;
      getBookmarkData.map((item) => {
        const selectedCategory = (categoryList.filter((category) => category.name === item.name)[0]?.categoryList) || [];
        const result = {
          name: item.category_name,
          url: {
            category1: selectedCategory[0],
            category2: selectedCategory[1],
            category3: selectedCategory[2],
          },
          id: item.category_id
        }
        const isDuplicate = bookmarkCategories.some(existingCategory => existingCategory.id === result.id);
        if (!isDuplicate) setBookmarkCategories((prev) => [...prev, result])
      })
    }
  }, [data]);

  const noticeFormat = (data, scraps) => {
    const newArray = data;
    newArray.map((item) => {
      const words = item.title.split(' ');
      if (words.length > 0 && words[0].startsWith("공지")) {
        const restOfWords = words.slice(1);
        item.title = restOfWords.join(' ');
        item.fixed = item.notice_id === null ? true : false;
      }
      if (Array.isArray(scraps)) {
        item.isClip = scraps.some((clip) => clip.id === item.id);
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
      const result = categoryIdList.filter((cat) => cat.name === searchCategory).length !== 0 ? categoryIdList.filter((cat) => cat.name === searchCategory)[0].category_id : [];
      setSelectedCategory(result)
      return result;
    } else {
      const result = categoryIdList.filter((cat) => cat.name === searchCategory).length !== 0 ? categoryIdList.filter((cat) => cat.name === searchCategory)[0].category_id : [];
      setSelectedCategory(result)
      return result;
    }
  }

  // 사용자 검색 기능
  const handleSearch = async () => {
    const nowCategoryId = categotyIdSearch(category1, category2, category3);
    let SearchData;
    if (searchQuery === "") SearchData = fetchProjects("search", nowCategoryId, "");
    else SearchData = fetchProjects("search", nowCategoryId, searchQuery)
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

  // 즐겨찾기
  // 즐겨찾기 추가
  const handleAddBookmark = async () => {
    if (!isLogin) alert("로그인이 필요한 기능입니다.");
    else {
      if (category1 || category2 || category3) {
        const result = await addBookmark(selectedCategory);

        if (result === "fail") alert("이미 등록된 카테고리입니다.");
        else if (result === "error") alert("즐겨찾기 추가를 다시 시도주세요.");
        else if (result && result.category_id) {
          const newBookmark = {
            name: category3 || category2,
            url: {
              category1,
              category2,
              category3,
            },
            id: result.category_id,
          };
          setBookmarkCategories(prev => [...prev, newBookmark]);
        }
      }
    }
  };

  // 즐겨찾기 삭제(db에 id 전달)
  const handleDeleteBookmark = async (id) => {
    const result = await deleteBookmark(id);
    if (result === "fail") alert("해당 카테고리는 즐겨찾기로 등록되지 않은 카테고리입니다.");
    else if (result === "error") alert("즐겨찾기 삭제를 다시 시도해주세요.");
    else {
      const newArray = bookmarkCategories.filter((item) => item.id !== result)
      setBookmarkCategories(newArray);
      // get하기
    };
  }

  // 기록에서 검색
  const ListSearch = async (value) => {
    const SearchData = fetchProjects("search", value.id, "");
    try {
      const result = await SearchData; // Promise가 완료되고 해결될 때까지 대기하고 결과를 얻습니다.
      const formattedNotices = noticeFormat(result)// 이제 result에 PromiseResult가 들어 있습니다.
      setNoticeList(formattedNotices);
    } catch (error) {
      console.error('Error:', error);
    }
    setCategory1(value.url.category1);
    setCategory2(value.url.category2);
    setCategory3(value.url.category3);
  }

  // 스크랩
  const changeClipStarNotice = (item) => {
    if (!isLogin) alert("로그인이 필요한 기능입니다");
    else {
      if (item.type === "add") { setIsOpen(!isOpen); setSelectedNotice(item.value) }
      else {
        const result = deleteScraps({ notice_id: item, category_id: selectedCategory })
        if (result === "success") alert("스크랩이 취소되었습니다")
      }
      const scrapsData = getScraps();
      const formattedNotices = noticeFormat(noticeList, scrapsData);
      setNoticeList(formattedNotices);
    }
  }

  // 일정 등록
  const saveEvent = async (eventData) => {
    if (eventData.end) {
      const endDate = new Date(eventData.end);
      endDate.setHours(23, 59, 59, 999); // 날짜의 시간을 23:59:59.999로 설정
      eventData.end = endDate;
    }

    const resultData = {
      notice_id: eventData.id,
      category_id: selectedCategory,
      title: eventData.title,
      memo: eventData.extendedProps.memo,
      url: eventData.url,
      color_code: eventData.backgroundColor,
    }

    const json = JSON.stringify(resultData);
    const EventsData = addEventsScraps(json);
    try {
      const result = await EventsData; // Promise가 완료되고 해결될 때까지 대기하고 결과를 얻습니다.
      if (result === "success") {
        const response = window.confirm("저장된 내 일정을 확인하기 위해 마이페이지로 이동하시겠습니까?")
        if (response) navigate('/myPage')
      } else if (result === "fail") alert("잘못된 데이터 형태입니다. 다시 스크랩을 시도해주세요.");
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.userContainer}>
        {isLogin ? (
          <div>
            <div className={styles.text1}>즐겨찾기 공지사항</div>
            <UserCategory categoryList={bookmarkCategories}
              onClick={ListSearch}
              onDelete={handleDeleteBookmark}
            />
          </div>
        ) : (
          <div>
            <div className={styles.text1}>검색한 공지사항</div>
            <UserCategory categoryList={searchCategories}
              onClick={ListSearch}
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
            <button className={styles.searchButton} onClick={handleSearch}>
              검색
            </button>
          </div>

          <button className={styles.bookmarkButton} onClick={handleAddBookmark}>
            <FaStar size={15} className={styles.star} />
            <div>즐겨찾기에 추가</div>
          </button>
        </div>

        <div className={styles.itemList}>
          <Pagging data={noticeList} noticeCategory={categoryIdList} changeClipStarNotice={item => changeClipStarNotice(item)} />
        </div>
      </div>

      {!isLogin
        ? isOpen && <LoginModal onModalClose={() => setIsOpen(!isOpen)} />
        : isOpen && <ClipModal
          noticeId={selectedNotice.notice_id}
          categoryId={selectedCategory}
          onModalClose={() => setIsOpen(!isOpen)}
          openEventModal={() => { setIsOpen(!isOpen); setIsOpenEventModal(!isOpenEventModal) }} />
      }
      {isOpenEventModal && <EventModal
        modalTitle={'내 일정으로 추가'}
        eventId={selectedNotice.notice_id}
        prevData={{
          title: selectedNotice.title,
          start: selectedNotice.date_posted,
          url: selectedNotice.url,
        }}
        saveEvent={saveEvent}
        closeModal={() => setIsOpenEventModal(!isOpenEventModal)} />}
    </div>
  );
}

export default MainNotice;
