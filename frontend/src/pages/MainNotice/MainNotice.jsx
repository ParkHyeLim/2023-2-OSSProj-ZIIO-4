import React, { useState } from "react";
import { FaStar, FaRegStar } from 'react-icons/fa';
import './MainNotice.module copy.scss'
import categories from "../../util/category";

const contents = [
  { id: '공지', categories_1: '단과대', categories_2: '불교대학', categories_3: '불교학부', title: '[교과연계 협력학습] DoDream 학습동아리 최종 선정 팀 발표', date: '2023. 09. 21', writer: '나윤주' },
  { id: '공지', categories_1: '메인', categories_2: '학술공지', categories_3: '', title: '[교과연계 협력학습] DoDream 학습동아리 최종 선정 팀 발표', date: '2023. 09. 21', writer: '나윤주' },
  { id: '공지', categories_1: '단과대', categories_2: '불교대학', categories_3: '불교학부', title: '[교과연계 협력학습] DoDream 학습동아리 최종 선정 팀 발표', date: '2023. 09. 21', writer: '나윤주' },
  { id: '공지', categories_1: '단과대', categories_2: '불교대학', categories_3: '불교학부', title: '[교과연계 협력학습] DoDream 학습동아리 최종 선정 팀 발표', date: '2023. 09. 21', writer: '나윤주' },
  { id: '4398', categories_1: '단과대', categories_2: '불교대학', categories_3: '불교학부', title: '[교과연계 협력학습] DoDream 학습동아리 최종 선정 팀 발표', date: '2023. 09. 21', writer: '나윤주' },
  { id: '4399', categories_1: '단과대', categories_2: '불교대학', categories_3: '불교학부', title: '[교과연계 협력학습] DoDream 학습동아리 최종 선정 팀 발표', date: '2023. 09. 21', writer: '나윤주' },
  { id: '4400', categories_1: '단과대', categories_2: '불교대학', categories_3: '불교학부', title: '[교과연계 협력학습] DoDream 학습동아리 최종 선정 팀 발표', date: '2023. 09. 21', writer: '나윤주' },
  { id: '4401', categories_1: '메인', categories_2: '학술공지', categories_3: '', title: '[교과연계 협력학습] DoDream 학습동아리 최종 선정 팀 발표', date: '2023. 09. 21', writer: '나윤주' },
  { id: '4402', categories_1: '메인', categories_2: '학술공지', categories_3: '', title: '[교과연계 협력학습] DoDream 학습동아리 최종 선정 팀 발표', date: '2023. 09. 21', writer: '나윤주' },
  { id: '4403', categories_1: '단과대', categories_2: '불교대학', categories_3: '불교학부', title: '[교과연계 협력학습] DoDream 학습동아리 최종 선정 팀 발표', date: '2023. 09. 21', writer: '나윤주' },
  { id: '4404', categories_1: '단과대', categories_2: '불교대학', categories_3: '불교학부', title: '[교과연계 협력학습] DoDream 학습동아리 최종 선정 팀 발표', date: '2023. 09. 21', writer: '나윤주' },
  { id: '4405', categories_1: '단과대', categories_2: '불교대학', categories_3: '불교학부', title: '[교과연계 협력학습] DoDream 학습동아리 최종 선정 팀 발표', date: '2023. 09. 21', writer: '나윤주' },
  { id: '4406', categories_1: '단과대', categories_2: '불교대학', categories_3: '불교학부', title: '[교과연계 협력학습] DoDream 학습동아리 최종 선정 팀 발표', date: '2023. 09. 21', writer: '나윤주' },
  { id: '4407', categories_1: '단과대', categories_2: '불교대학', categories_3: '불교학부', title: '[교과연계 협력학습] DoDream 학습동아리 최종 선정 팀 발표', date: '2023. 09. 21', writer: '나윤주' },
]

function MainNotice() {
  const [categories1, setCategories1] = useState(''); // 선택한 대분류
  const [categories2, setCategories2] = useState(''); // 선택한 중분류
  const [categories3, setCategories3] = useState(''); // 선택한 소분류
  const [searchQuery, setSearchQuery] = useState(''); // 검색어
  const [bookmarkCategories, setBookmarkCategories] = useState([]); // 즐겨찾기
  const [filteredContents, setFilteredContents] = useState(contents); // 필터된 공지사항 목록
  const [isStarred, setIsStarred] = useState(
    Array(contents.length).fill(false) // 초기 상태는 모두 false // db랑 연동되면 북마크 사항 반영
  );

  const handleCategories1Change = (e) => {
    setCategories1(e.target.value);
    setCategories2(''); // 중분류 초기화
    setCategories3(''); // 소분류 초기화
  };

  const handleCategories2Change = (e) => {
    setCategories2(e.target.value);
    setCategories3(''); // 소분류 초기화
  };

  const handleSearch = () => {
    // 필터링 및 검색어 처리 로직 추가
    const filtered = contents.filter((item) => {
      const isCategoryMatch = !categories1 || item.categories_1 === categories1;
      const isSubcategoryMatch = !categories2 || item.categories_2 === categories2;
      const isSubSubcategoryMatch = !categories3 || item.categories_3 === categories3;
      const isQueryMatch = !searchQuery || item.title.includes(searchQuery);

      return isCategoryMatch && isSubcategoryMatch && isSubSubcategoryMatch && isQueryMatch;
    });

    setFilteredContents(filtered);
  };

  const handleBookmarkSearch = (url) => {
    // 필터링 및 검색어 처리 로직 추가
    const filtered = contents.filter((item) => {
      const isCategoryMatch = !categories1 || item.categories_1 === url.categories1;
      const isSubcategoryMatch = !categories2 || item.categories_2 === url.categories2;
      const isSubSubcategoryMatch = !categories3 || item.categories_3 === url.categories3;
      const isQueryMatch = !searchQuery || item.title.includes(searchQuery);

      return isCategoryMatch && isSubcategoryMatch && isSubSubcategoryMatch && isQueryMatch;
    });

    setFilteredContents(filtered);
  };

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
      setBookmarkCategories([...bookmarkCategories, newBookmark]);
    }
  };

  const toggleStar = (idx) => {
    setIsStarred((prevIsStarred) => {
      const updatedIsStarred = [...prevIsStarred];
      updatedIsStarred[idx] = !prevIsStarred[idx];
      return updatedIsStarred;
    });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', margin: '1rem', height: '88vh' }}>
      <div style={{
        width: '23vw',
        margin: '0 1vw 0 0',
        borderRadius: '15px',
        border: '1px solid #E5E7EB',
      }}>
        <div style={{ margin: '2.5rem 0 0 2rem', fontSize: '15px', fontWeight: 'normal' }}>즐겨찾기 공지사항</div>
        <div style={{ margin: '2rem 0 0 2rem' }}>
          {bookmarkCategories.map((value, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'flex-start',
                margin: '0 0 1rem 0',
                fontSize: '15px',
                fontWeight: 'normal',
              }}
              onClick={() => handleBookmarkSearch(value.url)}
            >
              <FaStar style={{ margin: '0.2rem 1rem 0 0', color: '#FCD34D' }} />
              <div>{value.name}</div>
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
          <button className="searchButton" onClick={handleSearch}>
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
            <div style={value.id === "공지" ? { width: '5rem', color: '#EA5514', fontWeight: 'bold', fontSize: '15px' } : { width: '5rem', fontSize: '13px' }}>
              {value.id}
            </div>
            <div style={value.id === "공지" ? { width: '80rem', fontWeight: 'bold', fontSize: '13px' } : { width: '80rem', fontSize: '13px' }}>{value.title}</div>
            <div style={value.id === "공지" ? { width: '18rem', fontWeight: 'bold', fontSize: '13px' } : { width: '18rem', fontSize: '13px' }}>{value.date}</div>
            <div style={value.id === "공지" ? { width: '10rem', fontWeight: 'bold', fontSize: '13px' } : { width: '10rem', fontSize: '13px' }}>{value.writer}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainNotice;