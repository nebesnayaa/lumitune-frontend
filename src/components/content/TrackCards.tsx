import React, { useEffect, useRef, useState} from "react";
import { usePlayer } from "../../context/PlayerContext";
import { useDragScroll } from "../../hooks/useDragScroll";
import { Track } from "../../types/HomeContentData";

import { getArtistById } from "../../api/artistService";
import { getAlbumById } from "../../api/albumService";

import defaultCover from "/images/defaultPlaylist.png";
import styles from "../../styles/home/MusicContent.module.css";
import { deleteTrack } from "../../api/trackService";

interface TrackCardsProps {
  songs: Track[];
  title: string;
  format: "default" | "private";
  onTrackDeleted: (deletedId: string) => void;
}

const TrackCards: React.FC<TrackCardsProps> = ({ songs, title, format, onTrackDeleted }) => {
  const { playTrack } = usePlayer();
  const sliderRef = useRef<HTMLDivElement>(null);
  useDragScroll(sliderRef);

  const [ artists, setArtists] = useState<Record<string, string>>({});
  const [ albumCovers, setAlbumCovers] = useState<Record<string, string>>({});

  const albumIds = Array.from(new Set(songs.map(song => song.albumId)));
  const artistIds = Array.from(new Set(songs.map(song => song.artistId)));

  useEffect(() => {
    if (songs.length > 0) {
      fetchAlbumCovers();
      fetchArtistsNames();
    }
  }, [songs]);

  const fetchAlbumCovers = async () => {
    const albumMap: Record<string, string> = {};

    const requests = albumIds.map(async (id) => {
      try {
        const album = await getAlbumById(id);
        albumMap[id] = album.cover.url;
      } catch (error) {
        console.error("Помилка при завантаженні альбому", id, error);
        albumMap[id] = "Невідомий альбом";
      }
    });

    await Promise.all(requests);
    setAlbumCovers(albumMap);
  };
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

  const handleTrackClick = (track: Track) => {
    playTrack(track);
  };

  const handleDeleteTrack = async (id: string) => {
    await deleteTrack(id);
    onTrackDeleted(id);
  }

  return(
    <div className={styles.container}>
      <div>
        <div className={styles.titleBlock}>
          { title === "home" ? (
            <h2 className={styles.title}>
              Топ ВАША <span className={styles.blue}>музика</span> сьогодні
            </h2>
          ) : (
            <h2 className={styles.title}>{title}</h2>
          )}
        </div>
        {songs.length === 0 && <p>У вас поки що немає вподобаних треків</p>}
        <div className={styles.slider} ref={sliderRef}>
          {songs.map((song, index) => (
            <div className={styles.card} key={index} onClick={() => handleTrackClick(song)}>
              <img 
                src={albumCovers[song.albumId] || defaultCover}
                alt={song.name}
                draggable="false"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = defaultCover;
                }}
              />
              { format === "private" && 
                <svg className={styles.deleteIcon} 
                    onClick={(e)=>{
                      e.stopPropagation();
                      handleDeleteTrack(song.id)}
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
              
              <p className={styles.authorName}>{artists[song.artistId] || "Author"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default TrackCards;
