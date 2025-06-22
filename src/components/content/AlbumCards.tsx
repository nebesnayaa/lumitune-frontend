import React, { useEffect, useRef, useState} from "react";
import { useDragScroll } from "../../hooks/useDragScroll";
import { Album } from "../../types/HomeContentData";

import { deleteAlbum, getAlbumById } from "../../api/albumService";
import { getArtistById } from "../../api/artistService";

import defaultCover from "/images/defaultPlaylist.png";
import styles from "../../styles/home/MusicContent.module.css";

interface AlbumCardsProps {
  albums: Album[];
  title: string;
  format: "default" | "private";
  onAlbumDeleted: (deletedId: string) => void;
}

const AlbumCards: React.FC<AlbumCardsProps> = ({ albums, title, format, onAlbumDeleted }) => {
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
        const album = await getAlbumById(id);
        console.log(album);
        tracksMap[id] = album.tracks?.length || 0;
      } catch (error) {
        console.error("Помилка при отриманні кількості треків альбому:", id, error);
        tracksMap[id] = 0;
      }
    });
    await Promise.all(requests);
    setTracksQnt(tracksMap);
  };

  const handleDeleteAlbum = async (id: string) => {
    await deleteAlbum(id);
    onAlbumDeleted(id);
  }

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
            { format === "private" && 
              <svg className={styles.deleteIcon} 
                  onClick={(e)=>{
                    e.stopPropagation();
                    handleDeleteAlbum(album.id)}
                  } width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2772_37355)">
                <path d="M16 30C12.287 30 8.72601 28.525 6.1005 25.8995C3.475 23.274 2 19.713 2 16C2 12.287 3.475 8.72601 6.1005 6.1005C8.72601 3.475 12.287 2 16 2C19.713 2 23.274 3.475 25.8995 6.1005C28.525 8.72601 30 12.287 30 16C30 19.713 28.525 23.274 25.8995 25.8995C23.274 28.525 19.713 30 16 30ZM16 32C20.2435 32 24.3131 30.3143 27.3137 27.3137C30.3143 24.3131 32 20.2435 32 16C32 11.7565 30.3143 7.68687 27.3137 4.68629C24.3131 1.68571 20.2435 0 16 0C11.7565 0 7.68687 1.68571 4.68629 4.68629C1.68571 7.68687 0 11.7565 0 16C0 20.2435 1.68571 24.3131 4.68629 27.3137C7.68687 30.3143 11.7565 32 16 32Z" fill="#7BAFDF"/>
                <path d="M9 16H23" stroke="#7BAFDF" strokeWidth="2" strokeLinecap="round"/>
                </g>
                <defs>
                <clipPath id="clip0_2772_37355">
                <rect width="32" height="32" fill="white"/>
                </clipPath>
                </defs>
              </svg>
            }
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
