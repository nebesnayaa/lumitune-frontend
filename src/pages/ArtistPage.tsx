import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Artist } from "../types/UserData";
import { getArtistById } from "../api/artistService";

import poster from "../assets/monthTop/image1.svg";
import styles from "../styles/pages/ArtistPage.module.css";

interface ArtistPageProps {
  onOpen: () => void;
}

const ArtistPage: React.FC<ArtistPageProps> = ({ onOpen }) => {
  const { id } = useParams<{ id: string }>();
  const [ artist, setArtist ] = useState<Artist | null>(null);
  // const [ songs, setSongs ] = useState<Track[]>();
  
  useEffect(() => {
    onOpen(); // Закриття бічної панелі
  }, []);

  useEffect(() => {
    if (!id) return;
    const fetchArtist = async () => {
      const data = await getArtistById(id);
      setArtist(data);
      console.log(data);
    };
    fetchArtist();
  }, [id]);

  if (!artist) return <p>Сторінка артиста</p>;

  return (
    <div className={styles.container}>
      {/* Заголовок */}
      <div className={styles.headerBlock}>
        <img src={artist.user.avatar?.url || poster} alt="" className={styles.artistImg}/>
        <div className={styles.nameSection}>
          <p className={styles.text}>Виконавець</p>
          <p className={styles.artistName}>{artist.user.username}</p>
          <div className={styles.profileSection}>
            <div className={styles.avatarFrame}>
              <img
                src={artist.user.avatar?.url || poster}
                alt=""
                className={styles.avatar}
                draggable="false"
              />
            </div>
            <p className={styles.username}>{artist.user.username}</p>
            <div className={styles.dot}></div>
            <p className={styles.listenings}>{artist.monthlyListeners} слухачів за місяць</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistPage;