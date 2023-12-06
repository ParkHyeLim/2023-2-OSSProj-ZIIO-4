import React from "react";
import styles from './NoticeItem.module.scss'; // 파일 경로를 실제 파일 위치에 맞게 수정
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

export default function AnnouncementItem({ item, category, itemNumber, onClipClick }) {

  var categoryName = "";
  if (Array.isArray(category)) {
    const filteredCategories = category.filter((cat) => cat.category_id === item.category_id);
    if (filteredCategories.length > 0) categoryName = filteredCategories[0].name;
    else categoryName = "";
  } else categoryName = "";

  const bookmarkComponent = (
    <>
      {item.isClip ?
        <BsBookmarkFill
          className={styles.bookmarkIcon}
          size={15}
          style={{ margin: "0.3rem 0 0 1.5rem" }}
          onClick={() => {
            const response = window.confirm("마이페이지에 저장된 스크랩 및 등록한 일정까지 삭제됩니다. 정말 삭제하시겠습니까?");
            if (response) onClipClick({ type: "delete", value: item })
          }} />
        :
        <BsBookmark
          className={styles.regBookmarkIcon}
          size={15}
          style={{ margin: "0.3rem 0 0 1.5rem" }}
          onClick={() => {
            const isToken = localStorage.getItem("ziio-token");
            if (isToken) onClipClick({ type: "add", value: item });
            else alert("로그인이 필요한 기능입니다");
          }} />
      }
    </>
  )

  return (
    <div className={styles.container}>

      {item.fixed ? (
        <>
          <div className={styles.leftContainer}>
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
