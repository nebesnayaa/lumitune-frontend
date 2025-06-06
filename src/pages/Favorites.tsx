import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
// import { Track } from "../types/HomeContentData";

import poster from "../assets/monthTop/image1.svg";
import defaultAvatar from "/images/defaultAvatar.png";
import styles from "../styles/favorites/Favorites.module.css";


interface FavoritesProps {
  onOpen: () => void;
}

const Favorites: React.FC<FavoritesProps> = ({ onOpen }) => {
  const { user } = useAuth();
  const avatarUrl = user?.avatarUrl || defaultAvatar;
  // const [ songs, setSongs ] = useState<Track[]>();
  
  useEffect(() => {
    onOpen(); // Закриття бічної панелі
  }, []);

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
          <p className={styles.album}>Альбом</p>
          <p className={styles.dateHeader}>Дата додавання</p>
          <p className={styles.durationHeader}>Час</p>
        </div>

        {/* { songs?.map((song, index)=> (
          <div className={styles.trackItem}>
            <p className={styles.numeration}>{index}</p>

            <div className={styles.poster}>
              <img src={song.coverUrl} alt="img" />
            </div>

            <div className={styles.trackName}>
              <p className={styles.name}>{song.name}</p>
              <p className={styles.author}>{song.artistName}</p>
            </div>

            <p className={styles.album}>{song.albumName}</p>
            <p className={styles.date}>Сьогодні</p>
            <p className={styles.duration}>{song.duration}</p>
          </div>
        ))} */}
        <div className={styles.trackItem}>
          <p className={styles.numeration}>1</p>

          <div className={styles.poster}>
            <img src={poster} alt="img" />
          </div>

          <div className={styles.trackName}>
            <p className={styles.name}>Вимолив</p>
            <p className={styles.author}>Jerry Heil, MONATIK, Evgeny Khmara</p>
          </div>

          <p className={styles.album}>Вимолив</p>
          <p className={styles.date}>Сьогодні</p>
          <p className={styles.duration}>3:02</p>
          
        </div>
        <div className={styles.trackItem}>
          <p className={styles.numeration}>10</p>

          <div className={styles.poster}>
            <img src={poster} alt="img" />
          </div>

          <div className={styles.trackName}>
            <p className={styles.name}>Вимолив</p>
            <p className={styles.author}>Jerry Heil</p>
          </div>

          <p className={styles.album}>Вимолив</p>
          <p className={styles.date}>Сьогодні</p>
          <p className={styles.duration}>3:02</p>
          
        </div>
      </div>
    </div>
  );
}

export default Favorites;