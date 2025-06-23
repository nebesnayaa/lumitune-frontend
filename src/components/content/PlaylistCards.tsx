import React, { useRef} from "react";
import { useNavigate } from "react-router";
import { useDragScroll } from "../../hooks/useDragScroll";
import { Playlist } from "../../types/HomeContentData";

import defaultCover from "/images/defaultPlaylist.png";
import styles from "../../styles/content/MusicContent.module.css";

interface PlaylistCardsProps {
  playlists: Playlist[];
}

const PlaylistCards: React.FC<PlaylistCardsProps> = ({ playlists }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  useDragScroll(sliderRef);

  const navigate = useNavigate();

  const handlePlaylistClick = (playlist: Playlist) => {
    navigate(`/playlist/${playlist.id}`);
  };

  return(
    <div className={styles.container}>
      <div>
        <div className={styles.titleBlock}>
          <h2 className={styles.title}>
            Плейлісти
          </h2>
        </div>
        <div className={styles.slider} ref={sliderRef}>
          {playlists.map((playlist, index) => (
            <div className={styles.card} key={index} onClick={() => handlePlaylistClick(playlist)}>
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
