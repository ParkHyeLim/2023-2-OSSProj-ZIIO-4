import React, { useEffect, useState } from "react";
import { FaStar, FaRegStar } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai'
import './MainNotice.module.scss'
import categories from "../../util/category";
import ClipModal from "../../components/ClipModal/ClipModal";

const categories_id = [
  { category_name: "일반공지", category_id: 0 },
  { category_name: "학사공지", category_id: 1 },
  { category_name: "학술공지", category_id: 2 },
  { category_name: "불교대학", category_id: 3 },
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
  const [categoryId, setCategoryId] = useState(categories_id); // db에서 카테고리 id 전달 받기
  const [filteredContents, setFilteredContents] = useState(Data); // db에서 필터된 공지사항 전달 받기(첫: 메인-일반공지)

  // 필터
  const [categories1, setCategories1] = useState('메인');
  const [categories2, setCategories2] = useState('일반공지');
  const [categories3, setCategories3] = useState('');
  const [searchQuery, setSearchQuery] = useState(''); // 검색어
  const [filterId, setFilterId] = useState(0);

  // 동작
  const [isSearch, setIsSearch] = useState(true); // 검색 버튼 활성화/비활성화
  const [isLogin, setIsLogin] = useState(true); // 로그인 여부
  const [isStarred, setIsStarred] = useState(
    Array(Data.length).fill(false) // 초기 상태는 모두 false // db랑 연동되면 북마크 사항 반영
  )
  const [isClipModalOpen, setIsClipModalOpen] = useState(false); // 모달창
  const [searchCategories, setSearchCategories] = useState([]); // 검색 기록
  const [bookmarkCategories, setBookmarkCategories] = useState([]); // 즐겨찾기

  // 공지 스크랩
  const [focusIndex, setFocusIndex] = useState(0);// focus된 공지 index

  // 검색 기록(세션 불러오기)
  useEffect(() => {
    // sessionStorage.clear();
    const isSessionData = sessionStorage.getItem('searchCategories');
    const parseExistingData = isSessionData ? JSON.parse(isSessionData) : sessionStorage.setItem('searchCategories', JSON.stringify([]));
    setSearchCategories(parseExistingData);
  }, []);

  // 필터
  useEffect(() => {
    if (categories2 === '') {
      setIsSearch(false);
    } else {
      setIsSearch(true);
    }

  }, [categories2]);

  const handleCategories1Change = (e) => {
    setCategories1(e.target.value);
    setCategories2(''); // 중분류 초기화
    setCategories3(''); // 소분류 초기화
  };

  const handleCategories2Change = (e) => {
    setCategories2(e.target.value);
    setCategories3(''); // 소분류 초기화
  };

  // 카테고리 id 찾기
  const checkSearchCategoryId = (c1, c2, c3) => {
    let select_category
    if (categories2 === '') {
      select_category = categoryId.filter((item) => {
        const isCategoryIdMatch = !c1 || item.category_name === c1;
        return isCategoryIdMatch;
      })
    } else if (categories3 === '') {
      select_category = categoryId.filter((item) => {
        const isCategoryIdMatch = !c2 || item.category_name === c2;
        return isCategoryIdMatch;
      })
    } else {
      select_category = categoryId.filter((item) => {
        const isCategoryIdMatch = !c3 || item.category_name === c3;
        return isCategoryIdMatch;
      });
    }

    setFilterId(select_category[0].category_id);  // 백에 전달
    return select_category[0].category_id
  }


  // 필터 테스트 용(추후에는 db에서 받기 때문에 사라질 것)
  // 검색(카테고리 id 받아서 db에 전달)
  const handleSearch = () => {
    const id = checkSearchCategoryId(categories1, categories2, categories3);

    const filtered = Data.filter((item) => {
      const isCategoryMatch = !filterId || item.category_id === id;
      return isCategoryMatch;
    });

    setFilteredContents(filtered);

    if (isLogin) {
      handleAddBookmark();
    } else {
      addSearchList(id);
    }
  };

  // 즐겨찾기 검색(카테고리id 받아서 db에 전달)
  const handleBookmarkSearch = (url) => {
    const id = checkSearchCategoryId(url.categories1, url.categories2, url.categories3);

    const filtered = Data.filter((item) => {
      const isCategoryMatch = !id || item.category_id === filterId;
      return isCategoryMatch;
    });

    setFilteredContents(filtered);
  };

  // 즐겨찾기 추가 
  const handleAddBookmark = () => {
    if (categories1 || categories2 || categories3) {
      const newBookmark = {
        name: categories3 || categories2,
        url: {
          categories1,
          categories2,
          categories3,
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

  // 스크랩 취소
  const handleCencleBookmark = (idx) => {
    setIsStarred((prevIsStarred) => {
      const updatedIsStarred = [...prevIsStarred];
      updatedIsStarred[idx] = !prevIsStarred[idx];
      return updatedIsStarred;
    });
    setIsClipModalOpen(!isClipModalOpen);
  }

  const toggleStar = (idx) => {
    setIsStarred((prevIsStarred) => {
      const updatedIsStarred = [...prevIsStarred];
      updatedIsStarred[idx] = !prevIsStarred[idx];
      return updatedIsStarred;
    });
    setFocusIndex(idx);
    setIsClipModalOpen(!isClipModalOpen);
  };

  // 검색 기록 (세션에 저장)
  const addSearchList = (id) => {
    if (categories1 || categories2 || categories3) {
      const newSearch = {
        name: categories3 || categories2,
        url: {
          categories1,
          categories2,
          categories3,
        },
        id: id,
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

  // 검색 기록에서 검색
  const handleSearchListSearch = (id) => {
    const filtered = Data.filter((item) => {
      const isCategoryMatch = !id || item.category_id === id;
      return isCategoryMatch;
    });

    setFilteredContents(filtered);
  };

  // 검색 기록 삭제


  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem', height: '88vh' }}>
      <div style={{
        width: '23vw',
        margin: '0 1vw 0 0',
        borderRadius: '15px',
        border: '1px solid #E5E7EB',
      }}>
        <div style={{ margin: '2.5rem 0 0 2rem', fontSize: '15px', fontWeight: 'normal' }}>{isLogin ? '즐겨찾기 공지사항' : '검색한 공지사항'}</div>
        <div style={{ margin: '2rem 0 0 2rem' }}>
          {isLogin ?
            bookmarkCategories.map((value, index) => (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    margin: '0 0 1rem 0',
                    fontSize: '15px',
                    fontWeight: 'normal',
                  }}
                  onClick={() => handleBookmarkSearch(value.url)}
                >
                  <FaStar style={{ margin: '0 1rem 0 0', color: '#FCD34D' }} />
                  <div>{value.name}</div>
                </div>
                <AiOutlineClose size={15} style={{ margin: "0 1rem 0 0" }} onClick={() => handleDeleteBookmark(value.name)} />
              </div>
            ))
            :
            searchCategories.map((value, index) => (
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    margin: '0 0 1rem 0',
                    fontSize: '15px',
                    fontWeight: 'normal',
                  }}
                  onClick={() => handleSearchListSearch(value.id)}
                >
                  <FaStar style={{ margin: '0.2rem 1rem 0 0', color: '#FCD34D' }} />
                  <div>{value.name}</div>
                </div>
                <AiOutlineClose onClick={() => handleDeleteBookmark(value.name)} />
              </div>
            ))}
        </div>
      </div>
      <div style={{
        width: '74vw',
        margin: 0,
        borderRadius: '15px',
        border: '1px solid #E5E7EB',
      }}>
        <div style={{ margin: '3rem' }}>
          <select
            className='SelectionBox SelectionText'
            onChange={handleCategories1Change}
            value={categories1}
          >
            <option className='SelectionText' value="">대분류</option>
            {categories.map((value, index) => (
              <option
                className='SelectionText'
                key={index}
                value={value.categories1}
              >
                {value.categories1}
              </option>
            ))}
          </select>
          <select
            className='SelectionBox SelectionText'
            onChange={handleCategories2Change}
            value={categories2}
            disabled={!categories1}
          >
            <option className='SelectionText' value="">중분류</option>
            {categories1 &&
              categories.find((cat) => cat.categories1 === categories1)?.categories2.map((value, index) => (
                <option
                  className='SelectionText'
                  key={index}
                  value={value.categories2}
                >
                  {value.categories2}
                </option>
              ))}
          </select>
          <select
            className='SelectionBox SelectionText'
            onChange={(e) => setCategories3(e.target.value)}
            value={categories3}
            disabled={!categories2}
          >
            <option className='SelectionText' value="">소분류</option>
            {categories2 &&
              categories.find((cat) => cat.categories1 === categories1)?.categories2.find((cat) => cat.categories2 === categories2)?.categories3.map((value, index) => (
                <option
                  className='SelectionText'
                  key={index}
                  value={value}
                >
                  {value}
                </option>
              ))}
          </select>
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="searchButton" onClick={handleSearch} disabled={!isSearch}>
            검색
          </button>
          <button style={{
            paddingaeft: '0.5rem',
            width: '12rem',
            height: '3.5rem',
            backgroundColor: '#ffffff',
            borderRadius: '7px',
            borderColor: '#E5E7EB',
          }} onClick={handleAddBookmark}>
            <FaStar style={{ color: '#FCD34D' }} />
            즐겨찾기 추가
          </button>
        </div>
        {filteredContents.map((value, index) => (
          <div key={index} style={{ display: 'flex', justifyContent: 'space-between', margin: '0 0 2rem 2rem' }}>
            <button className="starButton" onClick={() => toggleStar(index)}>
              {isStarred[index] ? <FaStar style={{ color: '#FCD34D' }} /> : <FaRegStar style={{ color: '0.5px soild #E5E7EB' }} />}
            </button>
            <div style={value.announcement_id === "공지" ? { width: '5rem', color: '#EA5514', fontWeight: 'bold', fontSize: '15px' } : { width: '5rem', fontSize: '13px' }}>
              {value.announcement_id}
            </div>
            <a href={value.announcement_url} target="_blank" rel="noopener noreferrer"><div style={value.announcement_id === "공지" ? { width: '80rem', fontWeight: 'bold', fontSize: '13px' } : { width: '80rem', fontSize: '13px' }}>{value.announcement_title}</div></a>
            <div style={value.announcement_id === "공지" ? { width: '18rem', fontWeight: 'bold', fontSize: '13px' } : { width: '18rem', fontSize: '13px' }}>{value.announcement_date_posted}</div>
            <div style={value.announcement_id === "공지" ? { width: '10rem', fontWeight: 'bold', fontSize: '13px' } : { width: '10rem', fontSize: '13px' }}>{value.announcement_author}</div>
          </div>
        ))}
      </div>
      {isClipModalOpen && (
        <ClipModal onModalClose={(idx) => handleCencleBookmark(idx)} />

      )}
    </div>
  );
}

export default MainNotice;