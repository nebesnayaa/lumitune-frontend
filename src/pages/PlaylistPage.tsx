import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../context/AuthContext";
// import { Playlist, Track } from "../types/HomeContentData";
import { Playlist } from "../types/HomeContentData";
import { getPlaylistById } from "../api/contentService";

import defaultCover from "/images/defaultPlaylist.png";
import defaultAvatar from "/images/defaultAvatar.png";
import styles from "../styles/pages/Favorites.module.css";

interface PlaylistProps {
  onOpen: () => void;
}

const PlaylistPage: React.FC<PlaylistProps> = ({ onOpen }) => {
  const { id } = useParams<{ id: string }>();
  const [ playlist, setPlaylist ] = useState<Playlist | null>(null);

  const { user } = useAuth();
  const avatarUrl = user?.avatarUrl || defaultAvatar;
  // const [ songs, setSongs ] = useState<Track[]>();
  
  useEffect(() => {
    onOpen(); // Закриття бічної панелі
  }, []);

  useEffect(() => {
    if (!id) return;
    const fetchArtist = async () => {
      const data = await getPlaylistById(id);
      setPlaylist(data);
    };
    fetchArtist();
  }, [id]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if(!playlist) return <></>;

  return (
    <div className={styles.container}>
      {/* Заголовок */}
      <div className={styles.headerBlock}>
        <p className={styles.text}>Плейлист</p>
        <p className={styles.title}>{playlist?.name}</p>
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
        <p className={styles.tracksAmount}>{playlist.tracks.length} треків</p>
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

        { playlist?.tracks?.map((song, index)=> (
          <div className={styles.trackItem} key={index}>
            <p className={styles.numeration}>{index+1}</p>

            <div className={styles.poster}>
              <img src={song.coverUrl || defaultCover} alt="img" />
            </div>

            <div className={styles.trackName}>
              <p className={styles.name}>{song.name}</p>
              <p className={styles.author}>{song.artistName}</p>
            </div>

            <p className={styles.album}>{song.albumName}</p>
            <p className={styles.date}>Сьогодні</p>
            <p className={styles.duration}>{formatTime(song.duration)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlaylistPage;