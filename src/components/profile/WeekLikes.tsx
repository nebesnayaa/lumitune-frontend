import React, { useRef } from "react";
import { useDragScroll } from "../../hooks/useDragScroll";
import styles from "../../styles/profile/WeekLikes.module.css";

import poster from "/images/defaultPlaylist.png";

const WeekLikes: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  useDragScroll(sliderRef);

  return(
    <div className={styles.container}>
      <div>
        <div className={styles.titleBlock}>
          <div className={styles.title}>
            <h2 >До вподоби ВАМ цього тижня!</h2>
            <svg width="17" height="20" viewBox="0 0 17 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 10.551V7C15 3.416 12.084 0.5 8.5 0.5C4.916 0.5 2 3.416 2 7V10.551C0.86 10.783 0 11.793 0 13V22C0 23.378 1.121 24.5 2.5 24.5H14.5C15.879 24.5 17 23.378 17 22V13C17 11.793 16.14 10.783 15 10.551ZM9.609 18.23L9.995 20.929C10.016 21.073 9.973 21.218 9.878 21.327C9.783 21.436 9.645 21.5 9.5 21.5H7.5C7.355 21.5 7.217 21.437 7.122 21.328C7.027 21.219 6.984 21.073 7.005 20.93L7.391 18.231C6.555 17.813 6 16.95 6 16C6 14.622 7.121 13.5 8.5 13.5C9.879 13.5 11 14.622 11 16C11 16.95 10.445 17.813 9.609 18.23ZM12 10.5H5V7C5 5.07 6.57 3.5 8.5 3.5C10.43 3.5 12 5.07 12 7V10.5Z" fill="#006FB0"/>
            </svg>
          </div>
          
          <svg className={styles.arrow} width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 13L7 7L1 1" stroke="#40A2FF" stroke-width="2"/>
          </svg>
        </div>
        <div className={styles.slider} ref={sliderRef}>
          <div className={styles.card}>
            <img src={poster} alt="Photo" draggable="false"/>
            <p className={styles.trackName}>Superman</p>
            <p className={styles.authorName}>Eminem</p>
          </div>
          <div className={styles.card}>
            <img src={poster} alt="Photo" draggable="false"/>
            <p className={styles.trackName}>Superman</p>
            <p className={styles.authorName}>Eminem</p>
          </div>
          <div className={styles.card}>
            <img src={poster} alt="Photo" draggable="false"/>
            <p className={styles.trackName}>Superman</p>
            <p className={styles.authorName}>Eminem</p>
          </div>
          <div className={styles.card}>
            <img src={poster} alt="Photo" draggable="false"/>
            <p className={styles.trackName}>Superman</p>
            <p className={styles.authorName}>Eminem</p>
          </div>
          <div className={styles.card}>
            <img src={poster} alt="Photo" draggable="false"/>
            <p className={styles.trackName}>Superman</p>
            <p className={styles.authorName}>Eminem</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default WeekLikes;