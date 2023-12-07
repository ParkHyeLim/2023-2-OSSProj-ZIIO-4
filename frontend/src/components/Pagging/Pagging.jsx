import React, { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import styles from './Pagging.module.scss';
import NoticeItem from '../NoticeItem/NoticeItem';

const Pagging = ({ data, noticeCategory, changeClipStarNotice }) => {
  const [noticeData, setNoticeData] = useState([]);
  const [nowData, setNowData] = useState([{ author: '', category_id: '', date_posted: '', id: 0, title: '', url: '' }]);
  const [nowPage, setNowPage] = useState(1);
  const [nowFixedNuber, setNowFixedNuber] = useState(0);

  useEffect(() => {
    if (Array.isArray(data)) {
      setNowPage(1);
      const inputData = [...data];
      const fixedData = inputData.filter((item) => {
        return item.fixed === true;
      });
      setNowFixedNuber(fixedData.length);
      const updatedInputData = inputData.filter((item) => {
        return item.fixed !== true;
      });
      const mergedArray = fixedData.concat(updatedInputData);
      setNoticeData(mergedArray);
      setNowData(mergedArray.slice(0, 10));
    }
  }, [data]);

  useEffect(() => {
    if (nowData.length === 10) {
      const container = document.querySelector(`.${styles.container}`);
      const handleScroll = debounce(() => {
        const container = document.querySelector(`.${styles.container}`);
        const scrollHeight = container.scrollHeight;
        const scrollTop = container.scrollTop;
        const clientHeight = container.offsetHeight;

        if (scrollTop + clientHeight >= scrollHeight) {
          fetchMoreData();
        }
      }, 100);
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [nowData]);

  useEffect(() => {
    if (nowPage > 1) {
      const container = document.querySelector(`.${styles.container}`);
      const handleScroll = debounce(() => {
        const container = document.querySelector(`.${styles.container}`);
        const scrollHeight = container.scrollHeight - 100;
        const scrollTop = container.scrollTop;
        const clientHeight = container.offsetHeight;

        if (scrollTop + clientHeight >= scrollHeight) {
          fetchMoreData();
        }
      }, 100);
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [nowPage]);

  const fetchMoreData = () => {
    if (nowPage >= Math.ceil(noticeData.length / 10)) {
      return;
    }
    const cutNum = 10 * nowPage;
    const nextPageData = noticeData.slice(cutNum, cutNum + 10);
    setNowPage(prev => prev + 1);
    const mergedArray = nowData.concat(nextPageData);
    setNowData(mergedArray);
  };

  return (
    <div className={styles.container}>
      {nowData.map((value, index) => (
        <NoticeItem
          key={index}
          item={value}
          itemNumber={index - nowFixedNuber + 1}
          category={noticeCategory}
          onClipClick={item => changeClipStarNotice(item)}
        />
      ))}
    </div>
  );
};

export default Pagging;
