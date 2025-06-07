import React, { useState } from "react";
import { NavLink } from "react-router";
import { useAuth } from "../context/AuthContext";
import defaultAvatar from "/images/defaultAvatar.png";
import styles from "../styles/MobileMenu.module.css";


interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<Props> = ({ isOpen, onClose }) => {
  const [isActive, setIsActive] = useState(true);  // Логіка перемикання стану для сповіщень

  const { user } = useAuth();
  const avatarUrl = user?.avatarUrl || defaultAvatar;
  
  
  const handleToggle = () => {
    setIsActive(prev => !prev);
  }

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.menu} onClick={(e) => e.stopPropagation()}>
        {/* Account info */}
        <div className={styles.accountInfo}>
          <NavLink to="/profile" className={styles.profileLink} onClick={onClose}>
            <div className={styles.avatarSection}>
              <img
                src={avatarUrl}
                alt=""
                className={styles.avatar}
                draggable="false"
              />
            </div>
            <div className={styles.username}>{user?.username || "Нікнейм"}</div>
          </NavLink>
          <div className={styles.notifIcon} onClick={handleToggle}>
          { isActive ? (
            <svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1572_58271)">
            <path d="M13.5 19.5C15.7551 19.5 17.5 21.2449 17.5 23.5C17.5 25.6247 15.745 27.5 13.5 27.5C11.2449 27.5 9.5 25.7551 9.5 23.5C9.5 21.3753 11.255 19.5 13.5 19.5Z" fill="url(#paint0_linear_1572_58271)" stroke="url(#paint1_linear_1572_58271)"/>
            <path d="M4.81348 8.39941C4.93376 4.03392 8.56749 0.5 12.9404 0.5C17.4519 0.500187 21.1865 4.26621 21.1865 8.83691V15.9785C21.1865 17.2182 22.1248 18.1738 23.3643 18.1738C24.521 18.1739 25.5 19.1556 25.5 20.3369C25.5 21.5182 24.521 22.4999 23.3643 22.5H2.63574C1.47904 22.4999 0.50004 21.5182 0.5 20.3369C0.5 19.1556 1.47901 18.1739 2.63574 18.1738C3.87524 18.1738 4.81348 17.2182 4.81348 15.9785V8.39941Z" fill="url(#paint2_linear_1572_58271)" stroke="url(#paint3_linear_1572_58271)"/>
            </g>
            <defs>
            <linearGradient id="paint0_linear_1572_58271" x1="8.26397" y1="23.5347" x2="18.8108" y2="23.5347" gradientUnits="userSpaceOnUse">
            <stop stop-color="#0066BF"/>
            <stop offset="1" stop-color="#005791"/>
            </linearGradient>
            <linearGradient id="paint1_linear_1572_58271" x1="9.30052" y1="18.9123" x2="17.927" y2="28.3241" gradientUnits="userSpaceOnUse">
            <stop stop-color="#9DD8FF"/>
            <stop offset="1" stop-color="#D0FAFF" stop-opacity="0"/>
            </linearGradient>
            <linearGradient id="paint2_linear_1572_58271" x1="4.56474" y1="25.439" x2="25.843" y2="1.5278" gradientUnits="userSpaceOnUse">
            <stop stop-color="#003BD1"/>
            <stop offset="1" stop-color="#008CFF"/>
            </linearGradient>
            <linearGradient id="paint3_linear_1572_58271" x1="1.05905" y1="1.48435" x2="20.9551" y2="25.3901" gradientUnits="userSpaceOnUse">
            <stop stop-color="#9DD9FF"/>
            <stop offset="1" stop-color="#9DDEFF" stop-opacity="0"/>
            </linearGradient>
            <clipPath id="clip0_1572_58271">
            <rect width="26" height="28" fill="white"/>
            </clipPath>
            </defs>
            </svg>
          ) : (
            <svg width="26" height="28" viewBox="0 0 26 28" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_1669_11868)">
              <path d="M13.5 19.5C15.7551 19.5 17.5 21.2449 17.5 23.5C17.5 25.6247 15.745 27.5 13.5 27.5C11.2449 27.5 9.5 25.7551 9.5 23.5C9.5 21.3753 11.255 19.5 13.5 19.5Z" fill="url(#paint0_linear_1669_11868)" stroke="url(#paint1_linear_1669_11868)"/>
              <foreignObject x="-18" y="-18" width="62" height="59">
                <div 
                  style={{
                    backdropFilter: 'blur(9px)',
                    clipPath: 'url(#bgblur_1_1669_11868_clip_path)',
                    height: '100%',
                    width: '100%'
                  }}>
                </div>
              </foreignObject>
              <path data-figma-bg-blur-radius="18" d="M4.81348 8.39941C4.93376 4.03392 8.56749 0.5 12.9404 0.5C17.4519 0.500187 21.1865 4.26621 21.1865 8.83691V15.9785C21.1865 17.2182 22.1248 18.1738 23.3643 18.1738C24.521 18.1739 25.5 19.1556 25.5 20.3369C25.5 21.5182 24.521 22.4999 23.3643 22.5H2.63574C1.47904 22.4999 0.50004 21.5182 0.5 20.3369C0.5 19.1556 1.47901 18.1739 2.63574 18.1738C3.87524 18.1738 4.81348 17.2182 4.81348 15.9785V8.39941Z" 
                fill="url(#paint2_linear_1669_11868)" stroke="url(#paint3_linear_1669_11868)"/>
              </g>
              <defs>
              <clipPath id="bgblur_1_1669_11868_clip_path" transform="translate(18 18)"><path d="M4.81348 8.39941C4.93376 4.03392 8.56749 0.5 12.9404 0.5C17.4519 0.500187 21.1865 4.26621 21.1865 8.83691V15.9785C21.1865 17.2182 22.1248 18.1738 23.3643 18.1738C24.521 18.1739 25.5 19.1556 25.5 20.3369C25.5 21.5182 24.521 22.4999 23.3643 22.5H2.63574C1.47904 22.4999 0.50004 21.5182 0.5 20.3369C0.5 19.1556 1.47901 18.1739 2.63574 18.1738C3.87524 18.1738 4.81348 17.2182 4.81348 15.9785V8.39941Z"/>
              </clipPath><linearGradient id="paint0_linear_1669_11868" x1="9.5081" y1="27.4919" x2="17.4919" y2="19.5081" gradientUnits="userSpaceOnUse">
              <stop stop-color="#393D40"/>
              <stop offset="1" stop-color="#5D6063"/>
              </linearGradient>
              <linearGradient id="paint1_linear_1669_11868" x1="9.6353" y1="19.7078" x2="17.1584" y2="27.7518" gradientUnits="userSpaceOnUse">
              <stop stop-color="white"/>
              <stop offset="1" stop-color="white" stop-opacity="0"/>
              </linearGradient>
              <linearGradient id="paint2_linear_1669_11868" x1="1.46785" y1="21.7015" x2="21.7185" y2="-1.19052" gradientUnits="userSpaceOnUse">
              <stop stop-color="#393D40"/>
              <stop offset="1" stop-color="#5D6063"/>
              </linearGradient>
              <linearGradient id="paint3_linear_1669_11868" x1="1.83531" y1="1.80891" x2="20.7632" y2="24.687" gradientUnits="userSpaceOnUse">
              <stop stop-color="white"/>
              <stop offset="1" stop-color="white" stop-opacity="0"/>
              </linearGradient>
              <clipPath id="clip0_1669_11868">
              <rect width="26" height="28" fill="white"/>
              </clipPath>
              </defs>
            </svg>
          )}
          </div>
        </div>
        {/* Menu */}
        <h3 className={styles.menuTitle}>Меню</h3>
        <nav className={styles.menuSection}>
          <NavLink to="/" onClick={onClose} 
              className={({ isActive }) => isActive 
              ? `${styles.menuItem} ${styles.active}` 
              : styles.menuItem}>
            <svg className={styles.homeIcon} width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.3673 19.9999H9.5L18.1879 19.5427C18.6609 19.5178 19.0516 19.1643 19.1237 18.6961L19.8899 13.7153C19.9556 13.2884 20.2879 12.9519 20.7139 12.8809L21.6645 12.7225C22.3281 12.6119 22.6954 11.8907 22.3945 11.2889L21.1014 8.7028C21.0347 8.56925 20.9388 8.45234 20.821 8.36067L12.5563 1.93258C12.2227 1.67312 11.762 1.65138 11.4055 1.87827L6.64399 4.90829C6.54869 4.96894 6.46435 5.0453 6.39455 5.13413L1.8252 10.9497C1.41288 11.4744 1.62049 12.2481 2.24012 12.496L2.9632 12.7852C3.29531 12.918 3.53118 13.2182 3.58176 13.5723L4.37735 19.1413C4.44772 19.634 4.86964 19.9999 5.3673 19.9999Z" fill="url(#paint0_linear_35_157)"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3528 1.21732C11.3336 0.546595 12.6665 0.546597 13.6474 1.21734L14.785 1.99528C18.1464 4.29405 21.0322 7.11769 23.3035 10.3372L23.6683 10.8546C24.1149 11.4875 24.0833 12.2494 23.7351 12.8199C23.3943 13.3783 22.7714 13.7353 22.0654 13.7353H21.0926C21.1438 15.3265 21.054 17.2359 20.8188 18.6104C20.5419 20.229 19.0452 21.2857 17.4519 21.2857H6.54819C4.9549 21.2857 3.45819 20.229 3.18134 18.6104C2.94624 17.2359 2.85638 15.3265 2.90755 13.7353H1.93454C1.22858 13.7353 0.60559 13.3783 0.264789 12.8199C-0.083453 12.2494 -0.114946 11.4875 0.331587 10.8545L0.696586 10.3371C2.96774 7.11765 5.85355 4.29407 9.21504 1.99537L10.3528 1.21732ZM12.4378 2.98615C12.1862 2.81413 11.8139 2.81413 11.5624 2.98615L10.4246 3.76418C7.26598 5.92418 4.56603 8.56934 2.44761 11.5724L2.43341 11.5925H4.04366C4.34477 11.5925 4.63198 11.7192 4.83497 11.9415C5.03798 12.1639 5.13804 12.4615 5.11065 12.7613C4.96807 14.3227 5.03199 16.7202 5.29353 18.2492C5.36789 18.6839 5.8338 19.1429 6.54819 19.1429H8.71248V15.003C8.71248 13.1875 10.1843 11.7157 11.9998 11.7157C13.8153 11.7157 15.2871 13.1875 15.2871 15.003V19.1429H17.4519C18.1663 19.1429 18.6322 18.6839 18.7066 18.2492C18.9682 16.7202 19.0322 14.3227 18.8895 12.7613C18.8621 12.4615 18.9622 12.1639 19.1652 11.9415C19.3682 11.7192 19.6553 11.5925 19.9565 11.5925H21.5666L21.5523 11.5724C19.434 8.56936 16.734 5.92415 13.5754 3.7641L12.4378 2.98615Z" fill="#F0F0F0"/>
              <defs>
              <linearGradient id="paint0_linear_35_157" x1="12" y1="1.49992" x2="12" y2="19.9999" gradientUnits="userSpaceOnUse">
              <stop stop-color="#204A79"/>
              <stop offset="1" stop-color="#204F79" stop-opacity="0"/>
              </linearGradient>
              </defs>
            </svg>
            <p>Головна</p>
          </NavLink>
          <NavLink to="/library" onClick={onClose} 
              className={({ isActive }) => isActive 
              ? `${styles.menuItem} ${styles.active}` 
              : styles.menuItem}>
            <svg className={styles.mediaIcon} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 20C0.734784 20 0.48043 19.8946 0.292893 19.7071C0.105357 19.5196 0 19.2652 0 19V1C0 0.734784 0.105357 0.48043 0.292893 0.292893C0.48043 0.105357 0.734784 0 1 0C1.26522 0 1.51957 0.105357 1.70711 0.292893C1.89464 0.48043 2 0.734784 2 1V19C2 19.2652 1.89464 19.5196 1.70711 19.7071C1.51957 19.8946 1.26522 20 1 20ZM13.5 0.134C13.348 0.0462328 13.1755 2.66256e-05 13 2.55108e-05C12.8245 2.43959e-05 12.652 0.0462283 12.5 0.133994C12.348 0.221759 12.2218 0.347993 12.134 0.500009C12.0462 0.652025 12 0.824466 12 1V19C12 19.2652 12.1054 19.5196 12.2929 19.7071C12.4804 19.8946 12.7348 20 13 20H19C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V4.464C20 4.28847 19.9538 4.11603 19.866 3.96401C19.7782 3.812 19.652 3.68577 19.5 3.598L13.5 0.134ZM7 0C6.73478 0 6.48043 0.105357 6.29289 0.292893C6.10536 0.48043 6 0.734784 6 1V19C6 19.2652 6.10536 19.5196 6.29289 19.7071C6.48043 19.8946 6.73478 20 7 20C7.26522 20 7.51957 19.8946 7.70711 19.7071C7.89464 19.5196 8 19.2652 8 19V1C8 0.734784 7.89464 0.48043 7.70711 0.292893C7.51957 0.105357 7.26522 0 7 0Z" fill="#F0F0F0"/>
            </svg>
            <p>Моя медіатека</p>
          </NavLink>
        </nav>
			
			  <div className={styles.horizontalLine}></div>
        {/* Playlists */}
        <h3 className={styles.menuTitle}>Плейлисти</h3>
        <nav className={styles.menuSection}>
          <NavLink to="/favorite" onClick={onClose}
              className={({ isActive }) => isActive 
              ? `${styles.menuItem} ${styles.active}` 
              : styles.menuItem}>
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 18.2236L12 20.2236L9 18.7236L5.5 16.2236L3.5 12.7236L2.5 8.22363L5 4.22363H9L12 5.72363L14 4.72363L17 3.72363L20 5.72363L21.5 8.72363L20.5 13.2236L15.5 18.2236Z" fill="url(#paint0_linear_1644_4096)" fill-opacity="0.8"/>
              <path d="M12 6.13058L11.4934 6.61817C11.6259 6.75588 11.8088 6.83371 12 6.83371C12.1912 6.83371 12.3741 6.75588 12.5066 6.61817L12 6.13058ZM9.58692 18.1505C8.16599 17.0303 6.61225 15.9365 5.37965 14.5485C4.17114 13.1877 3.32812 11.5998 3.32812 9.53976H1.92188C1.92188 12.0387 2.96297 13.945 4.32817 15.4823C5.66927 16.9924 7.37885 18.2005 8.71633 19.2549L9.58692 18.1505ZM3.32812 9.53976C3.32812 7.52332 4.46753 5.83235 6.02284 5.12142C7.53382 4.43074 9.56406 4.61365 11.4934 6.61817L12.5066 5.64299C10.2173 3.26454 7.56008 2.87253 5.43821 3.84244C3.36067 4.7921 1.92188 6.9972 1.92188 9.53976H3.32812ZM8.71633 19.2549C9.19655 19.6334 9.71207 20.0371 10.2345 20.3424C10.7568 20.6476 11.3527 20.8956 12 20.8956V19.4893C11.7098 19.4893 11.3682 19.3762 10.944 19.1283C10.52 18.8805 10.0801 18.5393 9.58692 18.1505L8.71633 19.2549ZM15.2837 19.2549C16.6211 18.2005 18.3307 16.9924 19.6718 15.4823C21.037 13.945 22.0781 12.0387 22.0781 9.53976H20.6719C20.6719 11.5998 19.8289 13.1877 18.6203 14.5485C17.3877 15.9365 15.834 17.0303 14.4131 18.1505L15.2837 19.2549ZM22.0781 9.53976C22.0781 6.9972 20.6393 4.7921 18.5618 3.84244C16.4399 2.87253 13.7827 3.26454 11.4934 5.64299L12.5066 6.61817C14.4359 4.61365 16.4662 4.43074 17.9771 5.12142C19.5324 5.83235 20.6719 7.52332 20.6719 9.53976H22.0781ZM14.4131 18.1505C13.9199 18.5393 13.48 18.8805 13.056 19.1283C12.6318 19.3762 12.2902 19.4893 12 19.4893V20.8956C12.6473 20.8956 13.2432 20.6476 13.7655 20.3424C14.288 20.0371 14.8034 19.6334 15.2837 19.2549L14.4131 18.1505Z" fill="#F0F0F0"/>
              <defs>
                <linearGradient id="paint0_linear_1644_4096" x1="12" y1="3.72363" x2="12" y2="20.2236" gradientUnits="userSpaceOnUse">
                <stop stop-color="#205579"/>
                <stop offset="1" stop-color="#205579" stop-opacity="0.31"/>
                </linearGradient>
              </defs>
            </svg>
            <p>Улюблені треки</p>
          </NavLink>
          <NavLink to="/create-playlist" onClick={onClose}
              className={({ isActive }) => isActive 
              ? `${styles.menuItem} ${styles.active}` 
              : styles.menuItem}>
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M2.25 6.22363C2.25 5.80942 2.58579 5.47363 3 5.47363H20C20.4142 5.47363 20.75 5.80942 20.75 6.22363C20.75 6.63784 20.4142 6.97363 20 6.97363H3C2.58579 6.97363 2.25 6.63784 2.25 6.22363ZM2.25 11.2236C2.25 10.8094 2.58579 10.4736 3 10.4736H10C10.4142 10.4736 10.75 10.8094 10.75 11.2236C10.75 11.6378 10.4142 11.9736 10 11.9736H3C2.58579 11.9736 2.25 11.6378 2.25 11.2236ZM2.25 16.2236C2.25 15.8094 2.58579 15.4736 3 15.4736H10C10.4142 15.4736 10.75 15.8094 10.75 16.2236C10.75 16.6378 10.4142 16.9736 10 16.9736H3C2.58579 16.9736 2.25 16.6378 2.25 16.2236Z" fill="#F0F0F0"/>
              <path d="M19.125 10.9088C20.767 11.8568 21.588 12.3308 21.8478 12.958C22.0507 13.4481 22.0507 13.9987 21.8478 14.4888C21.588 15.116 20.767 15.59 19.125 16.538C17.483 17.486 16.662 17.96 15.9889 17.8714C15.4631 17.8021 14.9862 17.5268 14.6633 17.106C14.25 16.5674 14.25 15.6194 14.25 13.7234C14.25 11.8274 14.25 10.8794 14.6633 10.3408C14.9862 9.91999 15.4631 9.64468 15.9889 9.57545C16.662 9.48683 17.483 9.96083 19.125 10.9088Z" fill="#F0F0F0"/>
            </svg>
            <p>Створити плейлист</p>
          </NavLink>
          <NavLink to="/mediateka#playlists" onClick={onClose} className={styles.menuItem}>
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.25 7.06738H19.5M8.25 12.2236H19.5M8.25 17.3799H19.5M4.5 7.06738H5.4375M4.5 12.2236H5.4375M4.5 17.3799H5.4375" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p>Ваші плейлисти</p>
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;