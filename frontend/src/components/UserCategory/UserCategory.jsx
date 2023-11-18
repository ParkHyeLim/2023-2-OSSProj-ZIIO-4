import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa';
import styles from './UserCategory.module.scss';

function BookmarkCategory({ categoryList }) {
  const searchCategory = title => {
    // onClick(title);
  };

  const deleteCategory = title => {
    // onDelete(title);
  };

  return (
    <div className={styles.categoryContainer}>
      {categoryList.map((value, index) => (
        <div key={index} className={styles.categoryButton} onClick={searchCategory(value.name)}>
          <div className={styles.content}>
            <FaStar size={15} className={styles.star} />
            <div>{value.name}</div>
          </div>
          <IoClose size={16} onClick={deleteCategory(value.name)} className={styles.close} />
        </div>
      ))}
    </div>
  );
}

export default BookmarkCategory;
