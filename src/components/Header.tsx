import React, { useState } from "react";
import styles from "../styles/Header.module.css";

const Header: React.FC = () => {
  const [isActive, setIsActive] = useState(false);  // Логіка перемикання стану для сповіщень

  const handleToggle = () => {
    setIsActive(prev => !prev);
  }

  return (
    <header className={styles.header}>
    {/* Логотип */}
    <div className={styles.logo}>
      <div className={styles.elipse}></div>
      <svg width="76" height="43" viewBox="0 0 73 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25.0433 36.3537L36.3017 53.9551L47.9389 36.3537L36.3016 -0.00049013L25.0433 36.3537Z" fill="#004275"/>
        <path d="M53.0164 23.6158L52.3019 33.2827L61.5181 29.9831L67.307 13.2475L53.0164 23.6158Z" fill="#004275"/>
        <path d="M58.8633 37.9504L52.9312 40.2863L57.5171 44.8056L69.0863 43.4588L58.8633 37.9504Z" fill="#004275"/>
        <path d="M15.27 37.9504L21.2021 40.2863L16.6163 44.8056L5.04703 43.4588L15.27 37.9504Z" fill="#004275"/>
        <path d="M19.9825 23.6158L20.697 33.2827L11.4808 29.9831L5.69187 13.2475L19.9825 23.6158Z" fill="#004275"/>
        <path d="M29.6187 32.1414L36.5355 42.8533L43.6063 32.1919L36.4165 10.0931L29.6187 32.1414Z" fill="#007AC1"/>
        <path d="M55.8882 23.3243L55.4776 29.2255L61.0681 27.233L64.544 17.0277L55.8882 23.3243Z" fill="#007AC1"/>
        <path d="M59.8562 39.5682L56.2422 41.0094L59.0186 43.7533L66.058 42.9L59.8562 39.5682Z" fill="#007AC1"/>
        <path d="M14.2772 39.5682L17.8912 41.0094L15.1148 43.7533L8.07535 42.9L14.2772 39.5682Z" fill="#007AC1"/>
        <path d="M17.1123 23.3243L17.5228 29.2255L11.9324 27.233L8.45639 17.0277L17.1123 23.3243Z" fill="#007AC1"/>
        <path d="M28.8462 42.7492L36.3313 53.7987L44.0047 42.7491L36.4997 19.6457L28.8462 42.7492Z" fill="#0B89CD"/>
        <path d="M52.9048 27.3066L52.4942 33.2078L58.0847 31.2153L61.5607 21.01L52.9048 27.3066Z" fill="#0B89CD"/>
        <path d="M56.6443 38.9377L53.0304 40.3789L55.8068 43.1228L62.8462 42.2695L56.6443 38.9377Z" fill="#0B89CD"/>
        <path d="M17.489 38.9377L21.103 40.3789L18.3266 43.1228L11.2872 42.2695L17.489 38.9377Z" fill="#0B89CD"/>
        <path d="M20.0941 27.3066L20.5047 33.2078L14.9142 31.2153L11.4382 21.01L20.0941 27.3066Z" fill="#0B89CD"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M41.266 35.7215L36.4171 20.8178L31.8573 35.6073L36.5361 42.8533L41.266 35.7215Z" fill="#40CCFF"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M59.2175 27.8924L61.5617 21.01L55.7548 25.2341L55.4771 29.2255L59.2175 27.8924Z" fill="#40CCFF"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M58.1003 42.8451L62.8485 42.2695L58.6879 40.0344L56.2429 41.0094L58.1003 42.8451Z" fill="#40CCFF"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0328 42.8451L11.2847 42.2695L15.4453 40.0344L17.8903 41.0094L16.0328 42.8451Z" fill="#40CCFF"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.7823 27.8923L11.4382 21.0099L17.245 25.2341L17.5228 29.2254L13.7823 27.8923Z" fill="#40CCFF"/>
      </svg>
    </div>

    {/* Поле пошуку */}
    <div className={styles.searchField}>
      <div className={styles.searchBar}>
        <svg className={styles.searchIcon} width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.0324 1.27893C5.8516 1.27893 1.62543 5.41887 1.62543 10.5579C1.62543 15.697 5.8516 19.8369 11.0324 19.8369C13.2664 19.8369 15.3229 19.0671 16.9396 17.7794L21.2923 22.132C21.6828 22.5226 22.316 22.5226 22.7065 22.132C23.097 21.7415 23.097 21.1083 22.7065 20.7178L18.3628 16.3741C19.661 14.7849 20.4394 12.7634 20.4394 10.5579C20.4394 5.41887 16.2132 1.27893 11.0324 1.27893ZM3.62543 10.5579C3.62543 6.55226 6.92713 3.27893 11.0324 3.27893C15.1377 3.27893 18.4394 6.55226 18.4394 10.5579C18.4394 14.5636 15.1377 17.8369 11.0324 17.8369C6.92713 17.8369 3.62543 14.5636 3.62543 10.5579Z" fill="#AAE4FF"/>
        </svg>
        <input type="text" placeholder="Виконавці, треки, подкасти..." />
        <svg className={styles.microIcon} width="12" height="22" viewBox="0 0 15 26" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.499512" y="0.46875" width="14" height="21" rx="6" fill="url(#paint0_linear_24_342)"/>
          <path d="M7.49951 19.5312C8.57695 19.5312 9.61027 19.1032 10.3721 18.3414C11.134 17.5795 11.562 16.5462 11.562 15.4688V7.34375C11.562 6.26631 11.134 5.233 10.3721 4.47113C9.61027 3.70926 8.57695 3.28125 7.49951 3.28125C6.42207 3.28125 5.38876 3.70926 4.62689 4.47113C3.86502 5.233 3.43701 6.26631 3.43701 7.34375V15.4688C3.43701 16.5462 3.86502 17.5795 4.62689 18.3414C5.38876 19.1032 6.42207 19.5312 7.49951 19.5312ZM5.06201 7.34375C5.06201 6.69728 5.31882 6.0773 5.77594 5.62018C6.23306 5.16306 6.85305 4.90625 7.49951 4.90625C8.14598 4.90625 8.76596 5.16306 9.22308 5.62018C9.6802 6.0773 9.93701 6.69728 9.93701 7.34375V15.4688C9.93701 16.1152 9.6802 16.7352 9.22308 17.1923C8.76596 17.6494 8.14598 17.9062 7.49951 17.9062C6.85305 17.9062 6.23306 17.6494 5.77594 17.1923C5.31882 16.7352 5.06201 16.1152 5.06201 15.4688V7.34375Z" fill="#519CD2"/>
          <path d="M13.187 12.5312V14.9688C13.187 16.4772 12.5878 17.9238 11.5212 18.9904C10.4546 20.057 9.00793 20.6562 7.49951 20.6562C5.99109 20.6562 4.54446 20.057 3.47784 18.9904C2.41123 17.9238 1.81201 16.4772 1.81201 14.9688V12.5312H0.187012V14.9688C0.187865 16.7669 0.851193 18.5016 2.05025 19.8416C3.24931 21.1815 4.90003 22.0327 6.68701 22.2325V23.9062H3.43701V25.5312H11.562V23.9062H8.31201V22.2325C10.099 22.0327 11.7497 21.1815 12.9488 19.8416C14.1478 18.5016 14.8112 16.7669 14.812 14.9688V12.5312H13.187Z" fill="#519CD2"/>
          <defs>
          <linearGradient id="paint0_linear_24_342" x1="7.49951" y1="0.46875" x2="7.49951" y2="21.4688" gradientUnits="userSpaceOnUse">
          <stop stop-color="#00B3FF" stop-opacity="0.54"/>
          <stop offset="1" stop-color="#001D6B" stop-opacity="0.2"/>
          </linearGradient>
          </defs>
        </svg>
      </div>
    </div>

    {/* Акаунт */}
    <div className={styles.userBlock}>
      <div className={styles.notifIcon} onClick={handleToggle}>
        { isActive ? (
          <svg width="20" height="20" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.8007 20.325C14.8007 22.0691 13.3552 23.5 11.5507 23.5C9.74616 23.5 8.30066 22.0691 8.30066 20.325C8.30066 18.581 9.74616 17.15 11.5507 17.15C13.3552 17.15 14.8007 18.581 14.8007 20.325Z" fill="url(#paint0_linear_2_624)" stroke="url(#paint1_linear_2_624)"/>
          <foreignObject x="-18" y="-18" width="58.65" height="55.95">
          </foreignObject><path data-figma-bg-blur-radius="18" d="M18.6056 7.80653V13.7048C18.6056 14.4582 19.2151 15.0722 19.9701 15.0722C21.1724 15.0722 22.15 16.0507 22.15 17.2611C22.15 18.4715 21.1724 19.45 19.9701 19.45H2.67996C1.47765 19.45 0.5 18.4715 0.5 17.2611C0.5 16.0507 1.47765 15.0722 2.67996 15.0722C3.43488 15.0722 4.04447 14.4582 4.04447 13.7048V7.80653C4.04447 3.77016 7.30614 0.5 11.325 0.5C15.3439 0.5 18.6056 3.77016 18.6056 7.80653Z" fill="url(#paint2_linear_2_624)" stroke="url(#paint3_linear_2_624)"/>
          <defs>
            <clipPath id="bgblur_0_2_624_clip_path" transform="translate(18 18)"><path d="M18.6056 7.80653V13.7048C18.6056 14.4582 19.2151 15.0722 19.9701 15.0722C21.1724 15.0722 22.15 16.0507 22.15 17.2611C22.15 18.4715 21.1724 19.45 19.9701 19.45H2.67996C1.47765 19.45 0.5 18.4715 0.5 17.2611C0.5 16.0507 1.47765 15.0722 2.67996 15.0722C3.43488 15.0722 4.04447 14.4582 4.04447 13.7048V7.80653C4.04447 3.77016 7.30614 0.5 11.325 0.5C15.3439 0.5 18.6056 3.77016 18.6056 7.80653Z"/>
            </clipPath>
            <linearGradient id="paint0_linear_2_624" x1="7.80066" y1="20.325" x2="15.3007" y2="20.325" gradientUnits="userSpaceOnUse"><stop stop-color="#0066BF"/><stop offset="1" stop-color="#005791"/>
            </linearGradient>
            <linearGradient id="paint1_linear_2_624" x1="8.33008" y1="17.2281" x2="14.4644" y2="23.921" gradientUnits="userSpaceOnUse">
            <stop stop-color="#9DD8FF"/>
            <stop offset="1" stop-color="#D0FAFF" stop-opacity="0"/>
            </linearGradient>
            <linearGradient id="paint2_linear_2_624" x1="1.27872" y1="18.8237" x2="18.8345" y2="-1.10807" gradientUnits="userSpaceOnUse">
            <stop stop-color="#0048FF" stop-opacity="0.55"/>
            <stop offset="1" stop-color="#00E1FF"/>
            </linearGradient>
            <linearGradient id="paint3_linear_2_624" x1="1.59884" y1="1.56903" x2="18.0033" y2="21.483" gradientUnits="userSpaceOnUse">
            <stop stop-color="#9DD9FF"/>
            <stop offset="1" stop-color="#9DDEFF" stop-opacity="0"/>
            </linearGradient>
          </defs>
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 23 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.8007 20.325C14.8007 22.0691 13.3552 23.5 11.5507 23.5C9.74616 23.5 8.30066 22.0691 8.30066 20.325C8.30066 18.581 9.74616 17.15 11.5507 17.15C13.3552 17.15 14.8007 18.581 14.8007 20.325Z" fill="url(#paint0_linear_2_620)" stroke="url(#paint1_linear_2_620)"/>
            <foreignObject x="-18" y="-18" width="58.65" height="55.95"></foreignObject>
            <path data-figma-bg-blur-radius="18" d="M18.6056 7.80653V13.7048C18.6056 14.4582 19.2151 15.0722 19.9701 15.0722C21.1724 15.0722 22.15 16.0507 22.15 17.2611C22.15 18.4715 21.1724 19.45 19.9701 19.45H2.67996C1.47765 19.45 0.5 18.4715 0.5 17.2611C0.5 16.0507 1.47765 15.0722 2.67996 15.0722C3.43488 15.0722 4.04447 14.4582 4.04447 13.7048V7.80653C4.04447 3.77016 7.30614 0.5 11.325 0.5C15.3439 0.5 18.6056 3.77016 18.6056 7.80653Z" fill="url(#paint2_linear_2_620)" stroke="url(#paint3_linear_2_620)"/>
            <defs>
            <clipPath id="bgblur_0_2_620_clip_path" transform="translate(18 18)"><path d="M18.6056 7.80653V13.7048C18.6056 14.4582 19.2151 15.0722 19.9701 15.0722C21.1724 15.0722 22.15 16.0507 22.15 17.2611C22.15 18.4715 21.1724 19.45 19.9701 19.45H2.67996C1.47765 19.45 0.5 18.4715 0.5 17.2611C0.5 16.0507 1.47765 15.0722 2.67996 15.0722C3.43488 15.0722 4.04447 14.4582 4.04447 13.7048V7.80653C4.04447 3.77016 7.30614 0.5 11.325 0.5C15.3439 0.5 18.6056 3.77016 18.6056 7.80653Z"/>
            </clipPath><linearGradient id="paint0_linear_2_620" x1="7.80066" y1="20.325" x2="15.3007" y2="20.325" gradientUnits="userSpaceOnUse">
            <stop stop-color="#0066BF"/>
            <stop offset="1" stop-color="#005791"/>
            </linearGradient>
            <linearGradient id="paint1_linear_2_620" x1="8.33008" y1="17.2281" x2="14.4644" y2="23.921" gradientUnits="userSpaceOnUse">
            <stop stop-color="#9DD8FF"/>
            <stop offset="1" stop-color="#D0FAFF" stop-opacity="0"/>
            </linearGradient>
            <linearGradient id="paint2_linear_2_620" x1="1.27872" y1="18.8237" x2="18.8345" y2="-1.10807" gradientUnits="userSpaceOnUse">
            <stop stop-color="#003BD1" stop-opacity="0.2"/>
            <stop offset="1" stop-color="#008CFF" stop-opacity="0.82"/>
            </linearGradient>
            <linearGradient id="paint3_linear_2_620" x1="1.59884" y1="1.56903" x2="18.0033" y2="21.483" gradientUnits="userSpaceOnUse">
            <stop stop-color="#9DD9FF"/>
            <stop offset="1" stop-color="#9DDEFF" stop-opacity="0"/>
            </linearGradient>
            </defs>
          </svg>
        )}
        
      </div>
      <div className={styles.avatar}>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14c-2.5 0-4.71-1.28-6-3.22.03-2 4-3.08 6-3.08s5.97 1.08 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z"/>
        </svg>
      </div>
    </div>
    </header>
  );
}
  
export default Header;