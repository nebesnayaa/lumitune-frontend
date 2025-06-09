import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import TrackList from "../components/content/TrackList";
import { Playlist } from "../types/HomeContentData";

import defaultAvatar from "/images/defaultAvatar.png";
import styles from "../styles/pages/PlaylistPage.module.css";
import { getPlaylistFavorites } from "../api/contentService";

interface FavoritesProps {
  onOpen: () => void;
}

const Favorites: React.FC<FavoritesProps> = ({ onOpen }) => {
  const { user } = useAuth();
  const avatarUrl = user?.avatarUrl || defaultAvatar;
  const [ favorites, setFavorites ] = useState<Playlist | null>();
  
  useEffect(() => {
    onOpen(); // Закриття бічної панелі
  }, []);

  useEffect(()=> {
    const fetchFavorites = async()=> {
      const favorites = await getPlaylistFavorites();
      setFavorites(favorites);
    }
    fetchFavorites();
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

        {favorites && <TrackList playlistId={favorites.id} songs={favorites?.tracks} format="viewing"/>}
      </div>
    </div>
  );
}

export default Favorites;