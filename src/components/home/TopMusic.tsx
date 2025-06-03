import React, { useRef} from "react";
import { useDragScroll } from "../../hooks/useDragScroll";
import { Album, Track } from "../../types/HomeContentData";
import { usePlayer } from "../../context/PlayerContext";
import posterTrack from "../../assets/topMusic/poster.png";
import styles from "../../styles/home/MusicContent.module.css";

interface TopMusicProps {
  songs: Album[];
}

const TopMusic: React.FC<TopMusicProps> = ({ songs }) => {
  const { playTrack } = usePlayer();
  const sliderRef = useRef<HTMLDivElement>(null);
  useDragScroll(sliderRef);

  const handleTrackClick = (track: Track[]) => {
    console.log("Clicked track:", track[0]);
    playTrack(track[0]);
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
            <div className={styles.card} key={index} onClick={() => handleTrackClick(song.tracks)}>
              <img 
                src={song.imageLink || posterTrack}
                alt={song.albumName}
                draggable="false"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = posterTrack;
                }}
              />
              
              <div className={styles.trackNameWrapper}>
                <div className={styles.scrollContainer}>
                  { song.albumName.length > 9 ? (
                    <span className={`${styles.scrollText} ${styles.animate}`}>
                      {song.albumName}12345&nbsp;&nbsp;&nbsp;&nbsp;{song.albumName}12345
                    </span>
                  ) : (
                    <span className={`${styles.scrollText}`}>
                      {song.albumName}
                    </span>
                  )}
                </div>
              </div>
              
              <p className={styles.authorName}>{song.author}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default TopMusic;
