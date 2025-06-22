import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Track } from "../types/HomeContentData";

import { getTracksByGenre, getTracksByMood } from "../api/trackService";
import TrackList from "../components/content/TrackList";

import defaultAvatar from "/images/defaultAvatar.png";
import styles from "../styles/pages/PlaylistPage.module.css";

interface MoodProps {
  onOpen: () => void;
}

const MoodPage: React.FC<MoodProps> = ({ onOpen }) => {
  const { name } = useParams<{ name: string }>();
  const location = useLocation();
  const type = location.state?.type;
  const { user } = useAuth();
  const avatarUrl = user?.avatarUrl || defaultAvatar;

  const [ tracks, setTracks ] = useState<Track[]>()

  useEffect(() => {
    onOpen(); // Закриття бічної панелі
  }, []);

  useEffect(() => {
    if (!name) return;
    const fetchMoodTracks = async () =>{
      if(type =="mood"){
        const tracks = await getTracksByMood(name);
        setTracks(tracks);
      }
      else{
        const tracks = await getTracksByGenre(name);
        setTracks(tracks);
      }
    }
    fetchMoodTracks();
  }, [name, type]);

  return (
    <div className={styles.container}>
      {/* Заголовок */}
      <div className={styles.headerBlock}>
        <p className={styles.text}>Підбірка</p>
        <p className={styles.title}>{name}</p>
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
        <p className={styles.tracksAmount}>{tracks?.length || "0"} треків</p>
      </div>

      {/* Список треків */}
      { tracks &&
        <div className={styles.listBlock}>
          <div className={styles.listHeader}>
            <p className={styles.albumHeader}>Альбом</p>
            <p className={styles.dateHeader}>Прослухано</p>
            <p className={styles.durationHeader}>Час</p>
          </div>

          <TrackList playlistId={""} songs={tracks} format="default" onTrackChange={() => void{}}/>
        </div>
      }  
    </div>
  );
}

export default MoodPage;