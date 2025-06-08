import React, { useRef} from "react";
import { useDragScroll } from "../../hooks/useDragScroll";
import { Track } from "../../types/HomeContentData";
import { usePlayer } from "../../context/PlayerContext";

import defaultCover from "/images/defaultPlaylist.png";
import styles from "../../styles/home/MusicContent.module.css";

interface TrackCardsProps {
  songs: Track[];
}

const TrackCards: React.FC<TrackCardsProps> = ({ songs }) => {
  const { playTrack } = usePlayer();
  const sliderRef = useRef<HTMLDivElement>(null);
  useDragScroll(sliderRef);

  const handleTrackClick = (track: Track) => {
    console.log("Clicked track:", track);
    playTrack(track);
  };

  return(
    <div className={styles.container}>
      <div>
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>
            Топ ВАША <span className={styles.blue}>музика</span> сьогодні
          </h2>
          <svg className={styles.arrow} width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 13L7 7L1 1" stroke="#40A2FF" stroke-width="2"/>
          </svg>
        </div>
        <div className={styles.slider} ref={sliderRef}>
          {songs.map((song, index) => (
            <div className={styles.card} key={index} onClick={() => handleTrackClick(song)}>
              <img 
                src={song.coverUrl || defaultCover}
                alt={song.name}
                draggable="false"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = defaultCover;
                }}
              />
              
              <div className={styles.trackNameWrapper}>
                <div className={styles.scrollContainer}>
                  { song.name.length > 13 ? (
                    <span className={`${styles.scrollText} ${styles.animate}`}>
                      {song.name}&nbsp;&nbsp;&nbsp;&nbsp;{song.name}
                    </span>
                  ) : (
                    <span className={`${styles.scrollText}`}>
                      {song.name}
                    </span>
                  )}
                </div>
              </div>
              
              <p className={styles.authorName}>{song.artistName || "Author"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default TrackCards;
