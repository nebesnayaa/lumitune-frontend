import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import styles from "../styles/pages/Notification.module.css";

interface NotificationProps {
  onOpen: () => void;
}

const Notifications: React.FC<NotificationProps> = ({ onOpen }) => {
  const [activeBtn, setActiveBtn] = useState<string>("all");
  const navigate = useNavigate();
  
  useEffect(() => {
    onOpen(); // Закриття бічної панелі
  }, []);
  
  return (
    <div className={styles.container}>
			
      <div className={styles.content}>
				<button className={styles.prevBtn} onClick={() => navigate(-1)}>
          <svg width="16" height="28" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 26L2.70711 14.7071C2.31658 14.3166 2.31658 13.6834 2.70711 13.2929L14 2" stroke="#74BCC3" strokeWidth="4" strokeLinecap="round"/>
          </svg>
        </button>
				<p className={styles.title}>Повідомлення</p>
				<p className={styles.notifText}>
          Функція повідомлень робить взаємодію з музикою ще зручнішою та цікавішою. Нові релізи улюблених артистів, подкастів, оновлення плейлистів.
        </p>
        <div className={styles.switchBtns}>
          <button 
            className={`${styles.btn} ${activeBtn === "all" ? styles.active : ""}`}
            onClick={() => setActiveBtn("all")}>
              Всі
          </button>
          <button 
            className={`${styles.btn} ${activeBtn === "tracks" ? styles.active : ""}`}
            onClick={() => setActiveBtn("tracks")}>
              Треки
          </button>
          <button 
            className={`${styles.btn} ${activeBtn === "other" ? styles.active : ""}`}
            onClick={() => setActiveBtn("other")}>
              Інше
            </button>
        </div>
        <div className={styles.horizontalLine}></div>
        <p className={styles.empty}>Поки нових сповіщень немає</p>
      </div>
    </div>
  );
}

export default Notifications;