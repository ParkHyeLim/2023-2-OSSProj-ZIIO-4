import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaStar } from "react-icons/fa";
import styles from './UserCategory.module.scss';

function BookmarkCategory({ categoryList }) {

  const searchCategory = (title) => {
    // onClick(title);
  }

  const deleteCategory = (title) => {
    // onDelete(title);
  }

  return (
    <div className={styles.categoryContainer}>
      {categoryList.map((value, index) => (
        <div key={index} className={styles.categoryButton} onClick={searchCategory(value.name)}>
          <div className={styles.content}>
            <FaStar size={15} className={styles.star} />
            <div>{value.name}</div>
          </div>
          <AiOutlineClose size={15} onClick={deleteCategory(value.name)} />
        </div>
      ))}
    </div>
  );
}

export default BookmarkCategory;