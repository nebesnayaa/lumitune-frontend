import React from "react";
import { Track } from "../../types/HomeContentData";
import { usePlayer } from "../../context/PlayerContext";

import defaultCover from "/images/defaultPlaylist.png";
import styles from "../../styles/content/TrackList.module.css";

interface TrackCardsProps {
  songs: Track[];
}

const TrackCards: React.FC<TrackCardsProps> = ({ songs }) => {
  const { playTrack } = usePlayer();

  const handleTrackClick = (track: Track) => {
    console.log("Clicked track:", track);
    playTrack(track);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return(
    <div className={styles.trackList}>
      { songs?.map((song, index)=> (
        <div className={styles.trackItem} key={index} onClick={()=> handleTrackClick}>
          <p className={styles.numeration}>{index + 1}</p>

          <div className={styles.poster}>
            <img src={song.coverUrl || defaultCover} alt="img" />
          </div>

          <div className={styles.trackName}>
            <p className={styles.name}>{song.name}</p>
            <p className={styles.author}>{song.artistName}</p>
          </div>

          <p className={styles.album}>{song.albumName}</p>
          {/* <p className={styles.date}>Сьогодні</p> */}
          <p className={styles.duration}>{formatTime(song.duration)}</p>
        </div>
      ))}
    </div>
  );
}
export default TrackCards;
