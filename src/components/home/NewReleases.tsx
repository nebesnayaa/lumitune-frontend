import React, { useRef} from "react";
import { useDragScroll } from "../../hooks/useDragScroll";
import styles from "../../styles/home/NewReleases.module.css";

import posterTrack from "../../assets/newRelease/poster.png";

const NewReleases: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  useDragScroll(sliderRef);

  return(
    <div className={styles.container}>
      <div className={styles.titleBlock}>
        <h2 className={styles.title}>
          Нові <span className={styles.blue}>музичні</span> релізи
        </h2>
        <svg className={styles.arrow} width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 13L7 7L1 1" stroke="#40A2FF" stroke-width="2"/>
        </svg>
      </div>
      <div className={styles.slider} ref={sliderRef}>
        <div className={styles.card}>
          <img src={posterTrack} alt="Photo" draggable="false"/>
          <p className={styles.trackName}>On The Floor</p>
          <p className={styles.authorName}>by JLO
            {'\n'}19 tracks</p>
        </div>
        <div className={styles.card}>
          <img src={posterTrack} alt="Photo" draggable="false"/>
          <p className={styles.trackName}>On The Floor</p>
          <p className={styles.authorName}>by JLO
            {'\n'}19 tracks</p>
        </div>
        <div className={styles.card}>
          <img src={posterTrack} alt="Photo" draggable="false"/>
          <p className={styles.trackName}>On The Floor</p>
          <p className={styles.authorName}>by JLO
            {'\n'}19 tracks</p>
        </div>
        <div className={styles.card}>
          <img src={posterTrack} alt="Photo" draggable="false"/>
          <p className={styles.trackName}>On The Floor</p>
          <p className={styles.authorName}>by JLO
            {'\n'}19 tracks</p>
        </div>
        <div className={styles.card}>
          <img src={posterTrack} alt="Photo" draggable="false"/>
          <p className={styles.trackName}>On The Floor</p>
          <p className={styles.authorName}>by JLO
            {'\n'}19 tracks</p>
        </div>
        <div className={styles.card}>
          <img src={posterTrack} alt="Photo" draggable="false"/>
          <p className={styles.trackName}>On The Floor</p>
          <p className={styles.authorName}>by JLO
            {'\n'}19 tracks</p>
        </div>
        <div className={styles.card}>
          <img src={posterTrack} alt="Photo" draggable="false"/>
          <p className={styles.trackName}>On The Floor</p>
          <p className={styles.authorName}>by JLO
            {'\n'}19 tracks</p>
        </div>
      </div>

    </div>
  );
}
export default NewReleases;
