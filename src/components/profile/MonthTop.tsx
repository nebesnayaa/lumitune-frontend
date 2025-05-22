import React from "react";
import styles from "../../styles/profile/MonthTop.module.css";

import poster from "../../assets/monthTop/image1.svg";

const MonthTop: React.FC = () => {

  return(
    <div className={styles.container}>
      <div>
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>Топ ваших треків цього місяця</h2>
        </div>
        <div className={styles.list}>
          <div className={styles.trackItem}>
            <div className={styles.trackImageBlock}>
              <img src={poster} alt="img" />
              <div className={styles.trackName}>
                <p className={styles.name}>Вимолив</p>
                <p className={styles.author}>Jerry Heil, MONATIK, Evgeny Khmara</p>
              </div>
            </div>
            <div className={styles.trackLengthBlock}>
              <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.62979 8.02681L5.89335 9.01905L4.40498 8.27487L2.66855 7.03456L1.6763 5.29812L1.18018 3.06557L2.42049 1.08107H4.40498L5.89335 1.82526L6.8856 1.32913L8.37397 0.833008L9.86235 1.82526L10.6065 3.31363L10.1104 5.54619L7.62979 8.02681Z" fill="url(#paint0_linear_2079_2345)"/>
                <path d="M5.896 2.02717L5.64465 2.26907C5.71041 2.3374 5.80116 2.376 5.896 2.376C5.99083 2.376 6.08158 2.3374 6.14735 2.26907L5.896 2.02717ZM4.69881 7.99053C3.99385 7.4348 3.22301 6.89211 2.61148 6.2035C2.01191 5.52839 1.59367 4.74057 1.59367 3.71854H0.895996C0.895996 4.95834 1.41251 5.90411 2.08982 6.66676C2.75517 7.41597 3.60333 8.01536 4.26689 8.53843L4.69881 7.99053ZM1.59367 3.71854C1.59367 2.71814 2.15896 1.87921 2.93058 1.5265C3.68021 1.18384 4.68747 1.27458 5.64465 2.26907L6.14735 1.78526C5.01158 0.605256 3.69325 0.410772 2.64054 0.891967C1.60981 1.36312 0.895996 2.45712 0.895996 3.71854H1.59367ZM4.26689 8.53843C4.50514 8.72625 4.7609 8.92653 5.02009 9.07802C5.27921 9.22941 5.57488 9.35243 5.896 9.35243V8.65476C5.752 8.65476 5.58255 8.59862 5.37209 8.47564C5.16172 8.35271 4.94348 8.18341 4.69881 7.99053L4.26689 8.53843ZM7.52511 8.53843C8.18865 8.01536 9.03683 7.41597 9.70218 6.66676C10.3795 5.90411 10.896 4.95834 10.896 3.71854H10.1983C10.1983 4.74057 9.78009 5.52839 9.18051 6.2035C8.56897 6.89211 7.79814 7.4348 7.09321 7.99053L7.52511 8.53843ZM10.896 3.71854C10.896 2.45712 10.1822 1.36312 9.15144 0.891967C8.09874 0.410772 6.78041 0.605256 5.64465 1.78526L6.14735 2.26907C7.10451 1.27458 8.11176 1.18384 8.86139 1.5265C9.63302 1.87921 10.1983 2.71814 10.1983 3.71854H10.896ZM7.09321 7.99053C6.84851 8.18341 6.63028 8.35271 6.4199 8.47564C6.20944 8.59862 6.04 8.65476 5.896 8.65476V9.35243C6.21711 9.35243 6.51279 9.22941 6.7719 9.07802C7.03111 8.92653 7.28683 8.72625 7.52511 8.53843L7.09321 7.99053Z" fill="#93D3E7"/>
                <defs>
                <linearGradient id="paint0_linear_2079_2345" x1="5.89335" y1="0.833008" x2="5.89335" y2="9.01905" gradientUnits="userSpaceOnUse">
                <stop stop-color="#0059FF"/>
                <stop offset="1" stop-color="#6FBAFF"/>
                </linearGradient>
                </defs>
              </svg>
              <p className={styles.duration}>3:02</p>
            </div>
          </div>
          <div className={styles.trackItem}>
            <div className={styles.trackImageBlock}>
              <img src={poster} alt="img" />
              <div className={styles.trackName}>
                <p className={styles.name}>Вимолив</p>
                <p className={styles.author}>Jerry Heil, MONATIK, Evgeny Khmara</p>
              </div>
            </div>
            <div className={styles.trackLengthBlock}>
              <p className={styles.duration}>3:02</p>
            </div>
          </div>
          <div className={styles.trackItem}>
            <div className={styles.trackImageBlock}>
              <img src={poster} alt="img" />
              <div className={styles.trackName}>
                <p className={styles.name}>Вимолив</p>
                <p className={styles.author}>Jerry Heil, MONATIK, Evgeny Khmara</p>
              </div>
            </div>
            <div className={styles.trackLengthBlock}>
              <p className={styles.duration}>3:02</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MonthTop;