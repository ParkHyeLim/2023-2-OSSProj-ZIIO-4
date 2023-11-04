import React, { useEffect } from "react";
import styles from './DropDownComp.module.scss';

export default function DropDownComp({ placeholder, data, fillterData, onChange }) {

  return (
    <>
      {placeholder === "대분류" ? (
        <select
          className={`${styles.SelectionBox} ${styles.SelectionText}`}
          onChange={(e) => onChange(e)}
          value={fillterData[0]}
        >
          <option className={styles.SelectionText} value="">{placeholder}</option>
          {data.map((value, index) => (
            <option
              className={styles.SelectionText}
              key={index}
              value={value.category1}
            >
              {value.category1}
            </option>
          ))}
        </select>
      ) : (
        placeholder === "중분류" ? (
          <select
            className={`${styles.SelectionBox} ${styles.SelectionText}`}
            onChange={(e) => onChange(e)}
            value={fillterData[1]}
            disabled={!fillterData[0]}
          >
            <option className={styles.SelectionText} value="">{placeholder}</option>
            {fillterData[0] &&
              data.find((cat) => cat.category1 === fillterData[0])?.category2.map((value, index) => (
                <option
                  className={styles.SelectionText}
                  key={index}
                  value={value.category2}
                >
                  {value.category2}
                </option>
              ))}
          </select>
        ) : (
          placeholder === "소분류" && (
            <select
              className={`${styles.SelectionBox} ${styles.SelectionText}`}
              onChange={(e) => onChange(e)}
              value={fillterData[2]}
              disabled={!fillterData[1]}
            >
              <option className={styles.SelectionText} value="">{placeholder}</option>
              {fillterData[1] &&
                data
                  .find((cat) => cat.category1 === fillterData[0])
                  ?.category2.find((cat) => cat.category2 === fillterData[1])
                  ?.category3.map((value, index) => (
                    <option
                      className={styles.SelectionText}
                      key={index}
                      value={value}
                    >
                      {value}
                    </option>
                  ))}
            </select>
          )
        )
      )}
    </>
  );
}
