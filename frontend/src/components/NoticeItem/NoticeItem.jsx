import React from "react";
import styles from './NoticeItem.module.scss'; // 파일 경로를 실제 파일 위치에 맞게 수정
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

export default function AnnouncementItem({ fixed, item, idx, clipStar, onStarClick }) {

  const bookmarkComponent = (
    <>
      {clipStar[idx] ?
        <BsBookmarkFill
          className={styles.bookmarkIcon}
          size={15}
          style={{ margin: "0.3rem 0 0 1.5rem" }}
          onClick={() => onStarClick(idx)} />
        :
        <BsBookmark
          className={styles.regBookmarkIcon}
          size={15}
          style={{ margin: "0.3rem 0 0 1.5rem" }}
          onClick={() => onStarClick(idx)} />
      }
    </>
  )

  return (
    <div className={styles.container}>


      {fixed ? (
        <>
          <div className={styles.leftContainer}>
            {bookmarkComponent}
            <div className={`${styles.announcementIdDefault} ${styles.announcementId} `}>
              공지
            </div>
            <a href={item.announcement_url} target="_blank" rel="noopener noreferrer">
              <div className={`${styles.announcementTitleDefault} ${styles.announcementTitle}`}>
                {item.announcement_title}
              </div>
            </a>
          </div>

          <div className={styles.rightContainer}>
            <div className={`${styles.announcementCategoryDefault} ${styles.announcementCategory}`}>
              {item.announcement_category}
            </div>
            <div className={`${styles.announcementDatePostedDefault} ${styles.announcementDatePosted}`}>
              {item.announcement_date_posted}
            </div>
            <div className={`${styles.announcementAuthorDefault} ${styles.announcementAuthor}`}>
              {item.announcement_author}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.leftContainer}>
            {bookmarkComponent}
            <div className={styles.announcementIdDefault}>
              {item.announcement_id}
            </div>
            <a href={item.announcement_url} target="_blank" rel="noopener noreferrer">
              <div className={`${styles.announcementTitleDefault}`}>
                {item.announcement_title}
              </div>
            </a>
          </div>

          <div className={styles.rightContainer}>
            <div className={`${styles.announcementCategoryDefault}`}>
              {item.announcement_category}
            </div>
            <div className={`${styles.announcementDatePostedDefault}`}>
              {item.announcement_date_posted}
            </div>
            <div className={`${styles.announcementAuthorDefault}`}>
              {item.announcement_author}
            </div>
          </div>
        </>
      )
      }
    </div >
  );
}
