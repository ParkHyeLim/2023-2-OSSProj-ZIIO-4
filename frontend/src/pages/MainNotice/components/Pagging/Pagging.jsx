import React, { useEffect, useState } from 'react';
import { LuDatabase } from "react-icons/lu";
import styles from './Pagging.module.scss';
import NoticeItem from '../NoticeItem/NoticeItem';

const Pagging = ({ data, noticeCategory, changeClipStarNotice }) => {
  const [noticeData, setNoticeData] = useState([{ author: '', category_id: '', date_posted: '', id: 0, title: '', url: '' }]);
  const [nowFixedNuber, setNowFixedNuber] = useState(0);

  useEffect(() => {
    const fixedData = [];
    const nonFixedData = [];
    if (Array.isArray(data)) {
      data.forEach(item => {
        if (item.fixed === true) fixedData.push(item);
        else nonFixedData.push(item);
      });
      setNowFixedNuber(fixedData.length);
      const mergedArray = fixedData.concat(nonFixedData);
      setNoticeData(mergedArray);
    }
  }, [data]);
  
  return (
    <div className={styles.container}>
      {noticeData.length === 0 ?
        <div className={styles.NonoDataContainer}>
          <LuDatabase className={styles.NonoDataImage} size={20} color="#ea5514" />
          <div className={styles.NonoDataText}>불러온 공지사항이 없습니다.</div>
        </div>
        : (noticeData.map((value, index) => (
          <NoticeItem
            key={index}
            item={value}
            itemNumber={index - nowFixedNuber + 1}
            category={noticeCategory}
            onClipClick={item => changeClipStarNotice(item)}
          />
        ))
        )
      }
    </div>
  );
};

export default Pagging;