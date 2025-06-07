import React, { useRef} from "react";
import { useDragScroll } from "../../hooks/useDragScroll";
import { Playlist } from "../../types/HomeContentData";

import defaultCover from "/images/defaultPlaylist.png";
import styles from "../../styles/home/MusicContent.module.css";

interface PlaylistCardsProps {
  playlists: Playlist[];
}

const PlaylistCards: React.FC<PlaylistCardsProps> = ({ playlists }) => {
  // const { playTrack } = usePlayer();
  const sliderRef = useRef<HTMLDivElement>(null);
  useDragScroll(sliderRef);

  // const handleTrackClick = (playlist: Playlist) => {
  //   console.log("Clicked track:", playlist);
  //   playTrack(playlist);
  // };

  return(
    <div className={styles.container}>
      <div>
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>
            Плейлісти
          </h2>
          <svg className={styles.arrow} width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 13L7 7L1 1" stroke="#40A2FF" stroke-width="2"/>
          </svg>
        </div>
        <div className={styles.slider} ref={sliderRef}>
          {playlists.map((playlist, index) => (
            <div className={styles.card} key={index}>
              <img 
                src={playlist.coverUrl?.url || defaultCover}
                alt={playlist.name}
                draggable="false"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = defaultCover;
                }}
              />
              
              <div className={styles.trackNameWrapper}>
                <div className={styles.scrollContainer}>
                  { playlist.name.length > 13 ? (
                    <span className={`${styles.scrollText} ${styles.animate}`}>
                      {playlist.name}&nbsp;&nbsp;&nbsp;&nbsp;{playlist.name}
                    </span>
                  ) : (
                    <span className={`${styles.scrollText}`}>
                      {playlist.name}
                    </span>
                  )}
                </div>
              </div>
              
              <p className={styles.authorName}>{playlist.tracks?.length || "0"} tracks</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default PlaylistCards;
