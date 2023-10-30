import React from "react";
import styles from './NoticeItem.module.scss'; // 파일 경로를 실제 파일 위치에 맞게 수정
import { FaRegStar, FaStar } from "react-icons/fa";

export default function AnnouncementItem({ item, idx, clipStar, onStarClick }) {
  return (
    <div className={styles.container}>
      {clipStar[idx] ?
        <FaStar className={styles.starIcon} size={15} onClick={() => onStarClick(idx)} />
        :
        <FaRegStar className={styles.regStarIcon} size={15} onClick={() => onStarClick(idx)} />
      }

      <div className={`${styles.announcementIdDefault} ${item.announcement_id === "공지" ? styles.announcementId : ''}`}>
        {item.announcement_id}
      </div>
      <a href={item.announcement_url} target="_blank" rel="noopener noreferrer">
        <div className={`${styles.announcementTitleDefault} ${item.announcement_id === "공지" ? styles.announcementTitle : ''}`}>
          {item.announcement_title}
        </div>
      </a>
      <div className={`${styles.announcementDatePostedDefault} ${item.announcement_id === "공지" ? styles.announcementDatePosted : ''}`}>
        {item.announcement_date_posted}
      </div>
      <div className={`${styles.announcementAuthorDefault} ${item.announcement_id === "공지" ? styles.announcementAuthor : ''}`}>
        {item.announcement_author}
      </div>
    </div>
  );
}
