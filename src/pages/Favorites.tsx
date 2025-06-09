import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import TrackList from "../components/content/TrackList";
import { Track } from "../types/HomeContentData";

import defaultAvatar from "/images/defaultAvatar.png";
import styles from "../styles/pages/PlaylistPage.module.css";

interface FavoritesProps {
  onOpen: () => void;
}

const Favorites: React.FC<FavoritesProps> = ({ onOpen }) => {
  const { user } = useAuth();
  const avatarUrl = user?.avatarUrl || defaultAvatar;
  const [ songs, setSongs ] = useState<Track[]>([]);
  
  useEffect(() => {
    onOpen(); // Закриття бічної панелі
  }, []);

  useEffect(()=> {
    //запит на улюблені треки
    setSongs([]);
  }, [user]);

  return (
    <div className={styles.container}>
      {/* Заголовок */}
      <div className={styles.headerBlock}>
        <p className={styles.text}>Плейлист</p>
        <p className={styles.title}>Улюблені треки</p>
      </div>
      <div className={styles.profileSection}>
        <div className={styles.avatarFrame}>
          <img
            src={avatarUrl}
            alt=""
            className={styles.avatar}
            draggable="false"
          />
        </div>
        <p className={styles.username}>{user?.username}</p>
        <div className={styles.dot}></div>
        <p className={styles.tracksAmount}>10 треків</p>
      </div>

      {/* Кнопки управління */}
      {/* <div className={styles.controlBtnBlock}></div> */}

      {/* Список треків */}
      <div className={styles.listBlock}>
        <div className={styles.listHeader}>
          <p className={styles.albumHeader}>Альбом</p>
          <p className={styles.dateHeader}>Дата додавання</p>
          <p className={styles.durationHeader}>Час</p>
        </div>

        <TrackList songs={songs} format="viewing"/>
      </div>
    </div>
  );
}

export default Favorites;