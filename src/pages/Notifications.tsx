import React, { useEffect } from "react";
import { useNavigate } from "react-router";

import styles from "../styles/pages/Settings.module.css";

interface NotificationProps {
  onOpen: () => void;
}

const Notifications: React.FC<NotificationProps> = ({ onOpen }) => {
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
				
      </div>
    </div>
  );
}

export default Notifications;