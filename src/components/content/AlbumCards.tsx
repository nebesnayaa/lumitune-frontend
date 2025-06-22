import React, { useEffect, useRef, useState} from "react";
import { useDragScroll } from "../../hooks/useDragScroll";
import { Album } from "../../types/HomeContentData";

import { getAlbumById } from "../../api/albumService";
import { getArtistById } from "../../api/artistService";

import defaultCover from "/images/defaultPlaylist.png";
import styles from "../../styles/home/MusicContent.module.css";

interface AlbumCardsProps {
  albums: Album[];
  title: string;
}

const AlbumCards: React.FC<AlbumCardsProps> = ({ albums, title }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  useDragScroll(sliderRef);

  const [ artists, setArtists] = useState<Record<string, string>>({});
  const [ tracksQnt, setTracksQnt ] = useState<Record<string, number>>({});

  const artistIds = Array.from(new Set(albums.map(album => album.artistId)));
  const albumIds = Array.from(new Set(albums.map(album => album.id)));

  useEffect(() => {
    if (albums.length > 0) {
      fetchArtistsNames();
      fetchTracksQnt();
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

  const fetchTracksQnt = async () => {
    const tracksMap: Record<string, number> = {};

    const requests = albumIds.map(async (id) => {
      try {
        // console.log(id);
        const album = await getAlbumById(id);
        tracksMap[id] = album.tracks?.length || 0;
      } catch (error) {
        console.error("Помилка при отриманні кількості треків альбому:", id, error);
        tracksMap[id] = 0;
      }
    });
    await Promise.all(requests);
    setTracksQnt(tracksMap);
  };

  return(
    <div className={styles.container}>
      <div className={styles.titleBlock}>
        {title === "home" ? (
          <h2 className={styles.title}>
            Нові <span className={styles.blue}>музичні</span> релізи
          </h2>
        ) : (
          <h2 className={styles.title}>{title}</h2>
        )}
      </div>
      <div className={styles.slider} ref={sliderRef}>
        {albums.map((album, index) => (
          <div className={styles.card} key={index}>
            <img 
              src={album.cover?.url || defaultCover}
              alt={album.name}
              draggable="false"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = defaultCover;
              }}
            />

            <div className={styles.trackNameWrapper}>
              <div className={styles.scrollContainer}>
                { album.name?.length > 13 ? (
                  <span className={`${styles.scrollText} ${styles.animate}`}>
                    {album.name}&nbsp;&nbsp;&nbsp;&nbsp;{album.name}
                  </span>
                ) : (
                  <span className={`${styles.scrollText}`}>
                    {album.name}
                  </span>
                )}
              </div>
            </div>
            <p className={styles.authorName}>
              by {artists[album.artistId]}{'\n'}{tracksQnt[album.id]} track(s)
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default AlbumCards;
