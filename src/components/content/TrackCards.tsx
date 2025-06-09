import React, { useEffect, useRef, useState} from "react";
import { useDragScroll } from "../../hooks/useDragScroll";
import { Track } from "../../types/HomeContentData";
import { usePlayer } from "../../context/PlayerContext";

import defaultCover from "/images/defaultPlaylist.png";
import styles from "../../styles/home/MusicContent.module.css";
import { getArtistById } from "../../api/userService";
import { getAlbumById } from "../../api/contentService";

interface TrackCardsProps {
  songs: Track[];
}

const TrackCards: React.FC<TrackCardsProps> = ({ songs }) => {
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
      // fetchAlbumNames();
      fetchArtistsNames();
      // fetchReleaseDates();
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
                src={albumCovers[song.albumId] || defaultCover}
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
              
              <p className={styles.authorName}>{artists[song.artistId] || "Author"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default TrackCards;
