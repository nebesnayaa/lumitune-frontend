import React, { useState } from "react";
import styles from "../styles/Header.module.css";
import { Link, NavLink } from "react-router";

interface HeaderProps {
  toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({toggleMenu}) => {
  const [isActive, setIsActive] = useState(false);  // Логіка перемикання стану для сповіщень

  const handleToggle = () => {
    setIsActive(prev => !prev);
  }

  return (
    <header className={styles.header}>
      {/* Логотип */}
      <NavLink to="/">
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
      </NavLink>
      

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
        <div className={styles.menuIcon} onClick={toggleMenu}>
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 18.2144H0V16.2144H19V18.2144ZM19 10.4995H0V8.49951H19V10.4995ZM19 2.78564H0V0.785645H19V2.78564Z" fill="#00C8FF"/>
          </svg>
        </div>
        <div className={styles.notifIcon} onClick={handleToggle}>
          { isActive ? (
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1605_3166)">
            <path d="M12.2 17.1001C14 17.1001 15.4 18.5001 15.4 20.3001C15.4 22.0001 14 23.5001 12.2 23.5001C10.4 23.5001 9 22.1001 9 20.3001C9 18.6001 10.4 17.1001 12.2 17.1001Z" fill="url(#paint0_linear_1605_3166)" stroke="url(#paint1_linear_1605_3166)"/>
            <path d="M12 0.5C16 0.5 19.2999 3.8 19.2999 7.8V13.7C19.2999 14.5 19.9 15.1 20.7 15.1C21.9 15.1 22.9 16.1 22.9 17.3C22.9 18.5 21.9 19.5 20.7 19.5H3.39995C2.19995 19.5 1.19995 18.5 1.19995 17.3C1.19995 16.1 2.19995 15.1 3.39995 15.1C4.19995 15.1 4.79995 14.5 4.79995 13.7V7.8C4.69995 3.8 7.99995 0.5 12 0.5Z" fill="url(#paint2_linear_1605_3166)" stroke="url(#paint3_linear_1605_3166)"/>
            </g>
            <defs>
            <linearGradient id="paint0_linear_1605_3166" x1="8.4766" y1="20.3248" x2="15.9766" y2="20.3248" gradientUnits="userSpaceOnUse">
            <stop stop-color="#0066BF"/>
            <stop offset="1" stop-color="#005791"/>
            </linearGradient>
            <linearGradient id="paint1_linear_1605_3166" x1="9.2137" y1="17.0377" x2="15.3481" y2="23.7306" gradientUnits="userSpaceOnUse">
            <stop stop-color="#9DD8FF"/>
            <stop offset="1" stop-color="#D0FAFF" stop-opacity="0"/>
            </linearGradient>
            <linearGradient id="paint2_linear_1605_3166" x1="5.00975" y1="21.5148" x2="22.5656" y2="1.583" gradientUnits="userSpaceOnUse">
            <stop stop-color="#003BD1"/>
            <stop offset="1" stop-color="#008CFF"/>
            </linearGradient>
            <linearGradient id="paint3_linear_1605_3166" x1="2.08385" y1="1.7262" x2="18.4883" y2="21.6401" gradientUnits="userSpaceOnUse">
            <stop stop-color="#9DD9FF"/>
            <stop offset="1" stop-color="#9DDEFF" stop-opacity="0"/>
            </linearGradient>
            <clipPath id="clip0_1605_3166">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
            </defs>
            </svg>
          ) : (
            <svg width="26" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.2368 18.4307C14.157 18.4307 15.7104 19.981 15.7104 21.8887C15.7103 23.7962 14.1569 25.3456 12.2368 25.3457C10.3167 25.3457 8.76336 23.7963 8.76318 21.8887C8.76318 19.9809 10.3166 18.4307 12.2368 18.4307Z" fill="url(#paint0_linear_1627_15636)" stroke="url(#paint1_linear_1627_15636)"/>
              <foreignObject x="-18" y="-18" width="60" height="57.4844">
                <div 
                  style={{
                    backdropFilter: 'blur(9px)',
                    clipPath: 'url(#bgblur_0_1627_15636_clip_path)',
                    height: '100%',
                    width: '100%'
                  }}>
                </div>
              </foreignObject>
              <path data-figma-bg-blur-radius="18" d="M12 0.5C16.2674 0.5 19.7441 4.03159 19.7441 8.40723V14.7588C19.7441 15.5413 20.3693 16.1933 21.1602 16.1934C22.4431 16.1934 23.5 17.2566 23.5 18.5889C23.5 19.9211 22.4431 20.9844 21.1602 20.9844H2.83984C1.55694 20.9844 0.500045 19.9211 0.5 18.5889C0.5 17.2566 1.55691 16.1934 2.83984 16.1934C3.63073 16.1933 4.25586 15.5413 4.25586 14.7588V8.40723C4.25586 4.03159 7.73264 0.5 12 0.5Z" fill="url(#paint2_linear_1627_15636)" stroke="url(#paint3_linear_1627_15636)"/>
              <defs>
              <clipPath id="bgblur_0_1627_15636_clip_path" transform="translate(18 18)"><path d="M12 0.5C16.2674 0.5 19.7441 4.03159 19.7441 8.40723V14.7588C19.7441 15.5413 20.3693 16.1933 21.1602 16.1934C22.4431 16.1934 23.5 17.2566 23.5 18.5889C23.5 19.9211 22.4431 20.9844 21.1602 20.9844H2.83984C1.55694 20.9844 0.500045 19.9211 0.5 18.5889C0.5 17.2566 1.55691 16.1934 2.83984 16.1934C3.63073 16.1933 4.25586 15.5413 4.25586 14.7588V8.40723C4.25586 4.03159 7.73264 0.5 12 0.5Z"/>
              </clipPath><linearGradient id="paint0_linear_1627_15636" x1="8.71184" y1="25.3991" x2="15.7334" y2="18.3495" gradientUnits="userSpaceOnUse">
              <stop stop-color="white" stop-opacity="0.15"/>
              <stop offset="1" stop-color="white" stop-opacity="0.3"/>
              </linearGradient>
              <linearGradient id="paint1_linear_1627_15636" x1="8.82415" y1="18.5532" x2="15.4388" y2="25.6541" gradientUnits="userSpaceOnUse">
              <stop stop-color="white"/>
              <stop offset="1" stop-color="white" stop-opacity="0"/>
              </linearGradient>
              <linearGradient id="paint2_linear_1627_15636" x1="1.35494" y1="20.2716" x2="20.2974" y2="-0.88869" gradientUnits="userSpaceOnUse">
              <stop stop-color="white" stop-opacity="0.15"/>
              <stop offset="1" stop-color="white" stop-opacity="0.3"/>
              </linearGradient>
              <linearGradient id="paint3_linear_1627_15636" x1="1.69413" y1="1.68972" x2="19.413" y2="22.8535" gradientUnits="userSpaceOnUse">
              <stop stop-color="white"/>
              <stop offset="1" stop-color="white" stop-opacity="0"/>
              </linearGradient>
              </defs>
            </svg>
          )}
          
        </div>
        <NavLink to="/profile">
          <div className={styles.avatar}>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14c-2.5 0-4.71-1.28-6-3.22.03-2 4-3.08 6-3.08s5.97 1.08 6 3.08c-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </div>
        </NavLink>
      </div>
      <Link to="/register">Reg</Link>
    </header>
  );
}
  
export default Header;