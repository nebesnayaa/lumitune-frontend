import React, { useEffect, useRef, useState} from "react";
import { useDragScroll } from "../../hooks/useDragScroll";
import { Track } from "../../types/HomeContentData";
import { usePlayer } from "../../context/PlayerContext";
import { getArtistById } from "../../api/artistService";
import { getAlbumById } from "../../api/contentService";

import defaultCover from "/images/defaultPlaylist.png";
import styles from "../../styles/home/MusicContent.module.css";

interface TrackCardsProps {
  songs: Track[];
  title: string;
}

const TrackCards: React.FC<TrackCardsProps> = ({ songs, title }) => {
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

  return(
    <div className={styles.container}>
      <div>
        <div className={styles.titleBlock}>
          { title === "Ваші вподобання" ? (
            <h2 className={styles.title}>{title}</h2>
          ) : (
            <h2 className={styles.title}>
              Топ ВАША <span className={styles.blue}>музика</span> сьогодні
            </h2>
          )}
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
