import React from "react";
import styles from "../styles/PlayerBar.module.css";

const Header: React.FC = () => {
  return (
    <div className={styles.playerBar}>
      {/* Блок ліворуч */}
      <div className={styles.trackInfo}>
        <img className={styles.trackPoster} src="./images/Poster.svg" alt="" />
        <div className={styles.trackText}>
          <p className={styles.trackName}>The Show</p>
          <p className={styles.trackAuthor}>Blackpink</p>
        </div>
        <div className={styles.icons}>
          <svg className={styles.heartIcon} width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 3.40707L10.4934 3.89466C10.6259 4.03237 10.8088 4.11019 11 4.11019C11.1912 4.11019 11.3741 4.03237 11.5066 3.89466L11 3.40707ZM8.58692 15.427C7.16599 14.3068 5.61225 13.213 4.37965 11.825C3.17114 10.4642 2.32812 8.87628 2.32812 6.81625H0.921875C0.921875 9.31521 1.96297 11.2215 3.32817 12.7587C4.66927 14.2689 6.37885 15.477 7.71633 16.5313L8.58692 15.427ZM2.32812 6.81625C2.32812 4.79981 3.46753 3.10884 5.02284 2.39791C6.53382 1.70723 8.56406 1.89014 10.4934 3.89466L11.5066 2.91948C9.21734 0.541029 6.56008 0.149022 4.43821 1.11893C2.36067 2.06859 0.921875 4.27369 0.921875 6.81625H2.32812ZM7.71633 16.5313C8.19655 16.9099 8.71207 17.3136 9.2345 17.6189C9.75678 17.9241 10.3527 18.1721 11 18.1721V16.7658C10.7098 16.7658 10.3682 16.6527 9.944 16.4048C9.51997 16.157 9.08008 15.8157 8.58692 15.427L7.71633 16.5313ZM14.2837 16.5313C15.6211 15.477 17.3307 14.2689 18.6718 12.7587C20.037 11.2215 21.0781 9.31521 21.0781 6.81625H19.6719C19.6719 8.87628 18.8289 10.4642 17.6203 11.825C16.3877 13.213 14.834 14.3068 13.4131 15.427L14.2837 16.5313ZM21.0781 6.81625C21.0781 4.27369 19.6393 2.06859 17.5618 1.11893C15.4399 0.149022 12.7827 0.541029 10.4934 2.91948L11.5066 3.89466C13.4359 1.89014 15.4662 1.70723 16.9771 2.39791C18.5324 3.10884 19.6719 4.79981 19.6719 6.81625H21.0781ZM13.4131 15.427C12.9199 15.8157 12.48 16.157 12.056 16.4048C11.6318 16.6527 11.2902 16.7658 11 16.7658V18.1721C11.6473 18.1721 12.2432 17.9241 12.7655 17.6189C13.288 17.3136 13.8034 16.9099 14.2837 16.5313L13.4131 15.427Z" fill="#93D3E7"/>
          </svg>
          <svg className={styles.plusIcon} width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8 11V19H11V11H19V8L11 8V0H8V8L0 8V11H8Z" fill="#93D3E7"/>
          </svg>
        </div>
      </div>

      {/* Аудіо-строка */}
      <div className={styles.trackField}>
        <div className={styles.controlButtons}>
          <svg width="15" height="12" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.9156 11.9856H4.84157L4.84157 5.70577H7.41497L3.94445 0.5L0.473938 5.70577L3.04734 5.70577L3.04733 13.7798L12.9156 13.7798V11.9856ZM7.08436 3.01442L15.1584 3.01442L15.1584 9.29425H12.585L16.0555 14.5L19.5261 9.29425L16.9527 9.29425V1.22019L7.08436 1.22019L7.08436 3.01442Z" fill="#93D3E7"/>
          </svg>
          <svg width="12" height="12" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.52606 8.1547V14H0.526062V7V0H2.52606V5.8453L12.5261 0.0717964V13.9282L2.52606 8.1547Z" fill="#93D3E7"/>
          </svg>
          <svg width="20" height="20" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.52606 6L0.526062 11.1962V0.803847L9.52606 6Z" fill="#A6DAFF"/>
          </svg>
          <svg width="12" height="12" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.5261 8.1547V14H12.5261V7V0H10.5261V5.8453L0.526062 0.0717964V13.9282L10.5261 8.1547Z" fill="#93D3E7"/>
          </svg>
          <svg width="15" height="12" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5785 4.18421H10.4297L8.16764 6.67474L7.07711 5.68295L9.55879 2.95147C9.62788 2.87554 9.71207 2.81489 9.80597 2.7734C9.89987 2.7319 10.0014 2.71049 10.1041 2.71053H11.5785V0.5L15.2627 3.49305L11.5785 6.39474V4.18421ZM10.43 10.8158H11.5788V8.60526L15.263 11.5526L11.5788 14.5V12.2895H10.1043C10.0017 12.2895 9.90015 12.2681 9.80625 12.2266C9.71235 12.1851 9.62816 12.1245 9.55907 12.0485L6.42086 8.59569L3.28265 12.0493C3.21356 12.1252 3.12937 12.1858 3.03547 12.2273C2.94157 12.2688 2.84004 12.2902 2.73739 12.2902H0.526123V10.8165H2.4117L5.42539 7.5L2.4117 4.18421H0.526123V2.71053H2.73739C2.84004 2.71049 2.94157 2.7319 3.03547 2.7734C3.12937 2.81489 3.21356 2.87554 3.28265 2.95147L10.43 10.8158Z" fill="#93D3E7"/>
          </svg>
        </div>
        <div className={styles.controlTrack}>
          <p className={styles.currentDuration}>02:57</p>
          <div className={styles.trackLine}></div>
          <p className={styles.trackDuration}>05:20</p>
        </div>
      </div>

      {/* Блок праворуч */}
      <div className={styles.volumeBlock}>
        <div className={styles.volumeBar}>
          <svg className={styles.volumeIcon} width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M13.1537 0L15.3461 7.12501V9.50002H13.1537L13.1537 0ZM13.1537 19.0001L15.3461 11.875V9.50005H13.1537L13.1537 19.0001ZM0 7.30766L8.76928 0.730725V9.49997V18.2692L0 11.6923V9.49997V7.30766ZM11.6924 7.85587L10.2309 2.92317V9.5001V16.077L11.6924 11.1443V9.5001L11.6924 7.85587Z" fill="#93D3E7"/>
          </svg>
          <div className={styles.volumeLine}></div>
        </div>
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M4 2H17V15H7V9H4V2ZM2 9V2V0H4H17H19V2V15V17H17H7V19H0V9H2Z" fill="#93D3E7"/>
        </svg>

      </div>
    </div>
  );
  }
  
  export default Header;