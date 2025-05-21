import React, { useRef} from "react";
import { useDragScroll } from "../../hooks/useDragScroll";
import styles from "../../styles/home/TopMusic.module.css";

import posterTrack from "../../assets/topMusic/poster.png";

const TopMusic: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  useDragScroll(sliderRef);

  return(
    <div className={styles.container}>
      <div>
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>
            Топ ВАША <span className={styles.blue}>музика</span> сьогодні
          </h2>
          <svg className={styles.arrow} width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 13L7 7L1 1" stroke="#40A2FF" stroke-width="2"/>
          </svg>
        </div>
        <div className={styles.slider} ref={sliderRef}>
          <div className={styles.card}>
            <img src={posterTrack} alt="Photo" draggable="false"/>
            <p className={styles.trackName}>Superman</p>
            <p className={styles.authorName}>Eminem</p>
          </div>
          <div className={styles.card}>
            <img src={posterTrack} alt="Photo" draggable="false"/>
            <p className={styles.trackName}>Superman</p>
            <p className={styles.authorName}>Eminem</p>
          </div>
          <div className={styles.card}>
            <img src={posterTrack} alt="Photo" draggable="false"/>
            <p className={styles.trackName}>Superman</p>
            <p className={styles.authorName}>Eminem</p>
          </div>
          <div className={styles.card}>
            <img src={posterTrack} alt="Photo" draggable="false"/>
            <p className={styles.trackName}>Superman</p>
            <p className={styles.authorName}>Eminem</p>
          </div>
          <div className={styles.card}>
            <img src={posterTrack} alt="Photo" draggable="false"/>
            <p className={styles.trackName}>Superman</p>
            <p className={styles.authorName}>Eminem</p>
          </div>
          <div className={styles.card}>
            <img src={posterTrack} alt="Photo" draggable="false"/>
            <p className={styles.trackName}>Superman</p>
            <p className={styles.authorName}>Eminem</p>
          </div>
          <div className={styles.card}>
            <img src={posterTrack} alt="Photo" draggable="false"/>
            <p className={styles.trackName}>Superman</p>
            <p className={styles.authorName}>Eminem</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TopMusic;
