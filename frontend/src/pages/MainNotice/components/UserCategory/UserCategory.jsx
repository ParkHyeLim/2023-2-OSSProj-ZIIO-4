import React, { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaStar } from 'react-icons/fa';
import styles from './UserCategory.module.scss';

function UserCategory({ categoryList, onClick, onDelete }) {
  const [data, setDate] = useState([]);

  useEffect(() => {
    setDate(categoryList);
  }, [categoryList])

  const searchCategory = value => {
    onClick(value);
  };

  const deleteCategory = id => {
    onDelete(id);
  };

  return (
    <div className={styles.categoryContainer}>
      {data && data.map((value, index) => (
        <div key={index} className={styles.categoryButton}>
          <div className={styles.content}>
            <FaStar size={16} className={styles.star} />
            <div onClick={() => searchCategory(value)}>{value.name}</div>
            <button className={styles.close}>
              <IoClose size={13} onClick={() => deleteCategory(value.id)} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserCategory;
