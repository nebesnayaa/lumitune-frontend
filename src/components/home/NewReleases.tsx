import React, { useRef} from "react";
import { useDragScroll } from "../../hooks/useDragScroll";

import { Album } from "../../types/HomeContentData";
import posterTrack from "../../assets/newRelease/poster.png";

import styles from "../../styles/home/MusicContent.module.css";

interface NewReleasesProps {
  albums: Album[];
}

const NewReleases: React.FC<NewReleasesProps> = ({albums}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  useDragScroll(sliderRef);

  return(
    <div className={styles.container}>
      <div className={styles.titleBlock}>
        <h2 className={styles.title}>
          Нові <span className={styles.blue}>музичні</span> релізи
        </h2>
        <svg className={styles.arrow} width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 13L7 7L1 1" stroke="#40A2FF" stroke-width="2"/>
        </svg>
      </div>
      <div className={styles.slider} ref={sliderRef}>
        {albums.map((album, index) => (
          <div className={styles.card} key={index}>
            <img 
              src={album.imageLink || posterTrack}
              alt={album.albumName}
              draggable="false"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = posterTrack;
              }}
            />

            <div className={styles.trackNameWrapper}>
              <div className={styles.scrollContainer}>
                { album.albumName.length > 13 ? (
                  <span className={`${styles.scrollText} ${styles.animate}`}>
                    {album.albumName}&nbsp;&nbsp;&nbsp;&nbsp;{album.albumName}
                  </span>
                ) : (
                  <span className={`${styles.scrollText}`}>
                    {album.albumName}
                  </span>
                )}
              </div>
            </div>
            {/* <p className={styles.trackName}>{album.albumName}</p> */}
            
            <p className={styles.authorName}>
              by {album.author}{'\n'}{album.tracksQnt} track(s)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default NewReleases;
