import React, { useEffect, useRef, useState} from "react";
import { useDragScroll } from "../../hooks/useDragScroll";
import { Album } from "../../types/HomeContentData";
import { getArtistById } from "../../api/artistService";

import defaultCover from "/images/defaultPlaylist.png";
import styles from "../../styles/home/MusicContent.module.css";

interface AlbumCardsProps {
  albums: Album[];
}

const AlbumCards: React.FC<AlbumCardsProps> = ({ albums }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  useDragScroll(sliderRef);

  const [ artists, setArtists] = useState<Record<string, string>>({});
  const artistIds = Array.from(new Set(albums.map(album => album.artistId)));

  useEffect(() => {
    if (albums.length > 0) {
      fetchArtistsNames();
    }
  }, [albums]);

  const fetchArtistsNames = async () => {
    const artistMap: Record<string, string> = {};

    const requests = artistIds.map(async (id) => {
      try {
        const artist = await getArtistById(id);
        artistMap[id] = artist.user.username;
      } catch (error) {
        console.error("Помилка при завантаженні артиста", id, error);
        artistMap[id] = "Невідомий артист";
      }
    });

    await Promise.all(requests);
    setArtists(artistMap);
  };

  return(
    <div className={styles.container}>
      <div className={styles.titleBlock}>
        <h2 className={styles.title}>
          Нові <span className={styles.blue}>музичні</span> релізи
        </h2>
      </div>
      <div className={styles.slider} ref={sliderRef}>
        {albums.map((album, index) => (
          <div className={styles.card} key={index}>
            <img 
              src={album.imageLink || defaultCover}
              alt={album.albumName}
              draggable="false"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = defaultCover;
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
            
            <p className={styles.authorName}>
              by {artists[album.artistId]}{album.albumName}{'\n'}{album.tracksQnt} track(s)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default AlbumCards;
