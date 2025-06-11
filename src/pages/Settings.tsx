import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../api/userService";

import styles from "../styles/pages/Settings.module.css";

const Settings: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
		try {
      await logoutUser();
    } catch (error) {
      console.error("Помилка при виході:", error);
    }
    logout();
    navigate("/");
  };

  return (
    <div className={styles.container}>
			
      <div className={styles.content}>
				<button className={styles.prevBtn} onClick={() => navigate(-1)}>
				<svg width="16" height="28" viewBox="0 0 16 28" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M14 26L2.70711 14.7071C2.31658 14.3166 2.31658 13.6834 2.70711 13.2929L14 2" stroke="#74BCC3" strokeWidth="4" strokeLinecap="round"/>
				</svg>
			</button>
				<p className={styles.title}>Налаштування</p>
				
				<div className={styles.accountBlock}>
					<p className={styles.topic}>Акаунт</p>
					<div className={styles.buttons}>
						<button onClick={handleLogout} className={styles.logoutBtn}>Вийти</button>
        		<button onClick={() => navigate("/login")} className={styles.changeAccBtn}>Змінити акаунт</button>
					</div>
				</div>
				<br/>

				<div className={styles.offlineBlock}>
					<p className={styles.topic}>Офлайн-режим</p>
					<label className={styles.switch}>
						<input type="checkbox" />
						<span className={styles.slider}></span>
					</label>
				</div>
				<p className={styles.helpLabel}>Слухайте музику без підключення до інтернету.</p>
				<br/>

				<div className={styles.languageBlock}>
					<p className={styles.topic}>Мова</p>
					<select className={styles.languageSelect} defaultValue="ua">
						<option value="ua">Українська(UA)</option>
					</select>
				</div>
				<p className={styles.helpLabel}>Оберіть мову платформи. Після цього зробіть перезапуск.</p>
				<br/>

				<div className={styles.notificationBlock}>
					<p className={styles.topic}>Сповіщення</p>
					<label className={styles.switch}>
						<input type="checkbox" />
						<span className={styles.slider}></span>
					</label>
				</div>
				<p className={styles.helpLabel}>Контролюйте ваші сповіщення.</p>
				<br/>

				<div className={styles.adultBlock}>
					<p className={styles.topic}>Контент для дорослих</p>
					<label className={styles.switch}>
						<input type="checkbox" />
						<span className={styles.slider}></span>
					</label>
				</div>
				<p className={styles.helpLabel}>
					Дозволити контент для дорослих(М)
					{'\n'}Контент позначений значком М(mature).
					{'\n'}Налаштування може зайняти деякий час!
				</p>
				<br/>

				<div className={styles.privacyBlock}>
					<p className={styles.topic}>Приватність</p>
				</div>
				<p className={styles.helpLabel}>Керуйте тим, хто може бачити ваші плейлисти, підписки та активність у додатку.</p>
				<br/>

				<div className={styles.publicPlaylistsBlock}>
					<p className={styles.helpLabel}>Показувати мої публічні плейлисти:</p>
					<label className={styles.switch}>
						<input type="checkbox" />
						<span className={styles.slider}></span>
					</label>
				</div>

				<div className={styles.viewCurrPlayBlock}>
					<p className={styles.helpLabel}>Дозволити іншим бачити, що я слухаю зараз:</p>
					<label className={styles.switch}>
						<input type="checkbox" />
						<span className={styles.slider}></span>
					</label>
				</div>

				<div className={styles.viewCurrPlayBlock}>
					<p className={styles.helpLabel}>Приховати мій профіль з пошуку:</p>
					<label className={styles.switch}>
						<input type="checkbox" />
						<span className={styles.slider}></span>
					</label>
				</div>
				<br/>

				<div className={styles.mediatekaBlock}>
					<p className={styles.topic}>Моя медіатека</p>
				</div>
				<p className={styles.helpLabel}>Слухайте музику з вашого пристрою!</p>
				<br/>

				<div className={styles.localFilesBlock}>
					<p className={styles.helpLabel}>Показати файли на пристрої</p>
					<label className={styles.switch}>
						<input type="checkbox" />
						<span className={styles.slider}></span>
					</label>
				</div>

				<div className={styles.musicFolderBlock}>
					<p className={styles.helpLabel}>Папка “Музика”</p>
					<label className={styles.switch}>
						<input type="checkbox" />
						<span className={styles.slider}></span>
					</label>
				</div>
				<br/>

				<div className={styles.colourBlock}>
					<p className={styles.topic}>Колір системи</p>
					<select className={styles.colourSelect} defaultValue="dark">
						<option value="dark">Колір системи</option>
					</select>
				</div>
				<br/>
      </div>
    </div>
  );
}

export default Settings;