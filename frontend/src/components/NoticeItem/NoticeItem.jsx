import React from "react";
import styles from './NoticeItem.module.scss'; // 파일 경로를 실제 파일 위치에 맞게 수정
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

export default function AnnouncementItem({ item, category, itemNumber, clipStar, onStarClick }) {

  var categoryName = "";
  if (Array.isArray(category)) {
    const filteredCategories = category.filter((cat) => cat.category_id === item.category_id);
    if (filteredCategories.length > 0) categoryName = filteredCategories[0].name;
    else categoryName = "";
  } else categoryName = "";

  const bookmarkComponent = (
    <>
      {clipStar[itemNumber] ?
        <BsBookmarkFill
          className={styles.bookmarkIcon}
          size={15}
          style={{ margin: "0.3rem 0 0 1.5rem" }}
          onClick={() => onStarClick(item.id)} />
        :
        <BsBookmark
          className={styles.regBookmarkIcon}
          size={15}
          style={{ margin: "0.3rem 0 0 1.5rem" }}
          onClick={() => onStarClick(item.id)} />
      }
    </>
  )

  return (
    <div className={styles.container}>

      {item.fixed ? (
        <>
          <div className={styles.leftContainer}>
            {bookmarkComponent}
            <div className={`${styles.announcementIdDefault} ${styles.announcementId} `}>
              공지
            </div>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <div className={`${styles.announcementTitleDefault} ${styles.announcementTitle}`}>
                {item.title}
              </div>
            </a>
          </div>

          <div className={styles.rightContainer}>
            <div className={`${styles.announcementCategoryDefault} ${styles.announcementCategory}`}>
              {categoryName}
            </div>
            <div className={`${styles.announcementDatePostedDefault} ${styles.announcementDatePosted}`}>
              {item.date_posted}
            </div>
            <div className={`${styles.announcementAuthorDefault} ${styles.announcementAuthor}`}>
              {item.author}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.leftContainer}>
            {bookmarkComponent}
            <div className={styles.announcementIdDefault}>
              {itemNumber}
            </div>
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <div className={`${styles.announcementTitleDefault}`}>
                {item.title}
              </div>
            </a>
          </div>

          <div className={styles.rightContainer}>
            <div className={`${styles.announcementCategoryDefault}`}>
              {categoryName}
            </div>
            <div className={`${styles.announcementDatePostedDefault}`}>
              {item.date_posted}
            </div>
            <div className={`${styles.announcementAuthorDefault}`}>
              {item.author}
            </div>
          </div>
        </>
      )
      }
    </div >
  );
}
