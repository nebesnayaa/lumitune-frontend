import React, { useEffect, useState } from "react";
import { usePlayer } from "../../context/PlayerContext";
import { Track } from "../../types/HomeContentData";

import { getAlbumById } from "../../api/albumService";
import { getTrackById } from "../../api/trackService";
import { getArtistById } from "../../api/artistService";
import { addTrackToPlaylist, removeTrackFromPlaylist } from "../../api/playlistService";

import defaultCover from "/images/defaultPlaylist.png";
import styles from "../../styles/content/TrackList.module.css";

interface TrackListProps {
  playlistId: string;
  songs: Track[];
  format: "default" | "viewing" | "adding";
  onTrackChange: () => void;
}

const TrackList: React.FC<TrackListProps> = ({ playlistId, songs, format, onTrackChange }) => {
  const { playTrack } = usePlayer();
  const [ albums, setAlbums] = useState<Record<string, string>>({});
  const [ artists, setArtists] = useState<Record<string, string>>({});
  const [ albumCovers, setAlbumCovers] = useState<Record<string, string>>({});
  const [ relieseDate, setReleaseDate ] = useState<Record<string, string>>({});
  const [ listenings, setListenings ] = useState<Record<string, string>>({});

  const albumIds = Array.from(new Set(songs.map(song => song.albumId)));
  const artistIds = Array.from(new Set(songs.map(song => song.artistId)));
  const songsIds = Array.from(new Set(songs.map(song => song.id)));

  useEffect(() => {
    if (songs.length > 0) {
      fetchAlbumCovers();
      fetchAlbumNames();
      fetchArtistsNames();
      if(format == "viewing")
        fetchReleaseDates();
      else
        fetchListenings();
    }
  }, [songs]);

  const fetchAlbumNames = async () => {
    const albumMap: Record<string, string> = {};

    const requests = albumIds.map(async (id) => {
      try {
        const album = await getAlbumById(id);
        albumMap[id] = album.name;
      } catch (error) {
        console.error("Помилка при завантаженні альбому", id, error);
        albumMap[id] = "Невідомий альбом";
      }
    });

    await Promise.all(requests);
    setAlbums(albumMap);
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
  const fetchAlbumCovers = async () => {
    const albumMap: Record<string, string> = {};

    const requests = albumIds.map(async (id) => {
      try {
        const album = await getAlbumById(id);
        albumMap[id] = album.cover.url;
      } catch (error) {
        // console.error("Помилка при завантаженні альбому", id, error);
        albumMap[id] = "Невідомий альбом";
      }
    });

    await Promise.all(requests);
    setAlbumCovers(albumMap);
  };
  const fetchReleaseDates = async () => {
    const reliaseMap: Record<string, string> = {};

    const requests = albumIds.map(async (id) => {
      try {
        const album = await getAlbumById(id);
        reliaseMap[id] = album.relDate;
      } catch (error) {
        console.error("Помилка при завантаженні альбому", id, error);
        reliaseMap[id] = "Невідома дата";
      }
    });

    await Promise.all(requests);
    setReleaseDate(reliaseMap);
  };
  const fetchListenings = async () => {
    const listensMap: Record<string, string> = {};

    const requests = songsIds.map(async (id) => {
      try {
        const song = await getTrackById(id);
        listensMap[id] = song.playsNumber;
      } catch (error) {
        console.error("Помилка при завантаженні трека", id, error);
        listensMap[id] = "Невідома кількість";
      }
    });

    await Promise.all(requests);
    setListenings(listensMap);
  };

  const handleTrackClick = (track: Track) => {
    playTrack(track);
  };

  const handleAddTrackToPlaylist = async(track: Track) => {
    await addTrackToPlaylist(track.id, playlistId);
    onTrackChange();
  }

  const handleRemoveTrackFromPlaylist = async(track: Track) => {
    await removeTrackFromPlaylist(track.id, playlistId);
    onTrackChange();
  }

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Місяці з 0
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return(
    <div className={styles.trackList}>
      { songs.map((song, index)=> (
        <div className={styles.trackItem} key={index} onClick={()=> handleTrackClick(song)}>
          <p className={styles.numeration}>{index + 1}</p>

          <div className={styles.poster}>
            <img  src={albumCovers[song.albumId]}
              onError={(e) => {
                  e.currentTarget.onerror = null; // щоб не зациклити
                  e.currentTarget.src = defaultCover;
              }} 
              alt="img" />
          </div>

          <div className={styles.trackName}>
            <p className={styles.name}>{song.name}</p>
            <p className={styles.author}>{artists[song.artistId] || "Author..."}</p>
          </div>

          <p className={styles.album}>{albums[song.albumId] || "Album..."}</p>
          { (format !== "viewing") && 
            <p className={styles.date}>{listenings[song.id] || "0"}</p>
          }
          { format == "viewing" &&
            <p className={styles.date}>{formatDate(relieseDate[song.albumId]) || "Release..."}</p>
          }
          <p className={styles.duration}>{formatTime(song.duration)}</p>

          {/* Icon add/remove */}
          { format == "adding" && 
            <svg  className={styles.addIcon} 
                  onClick={(e)=>{
                    e.stopPropagation();
                    handleAddTrackToPlaylist(song)}
                  } width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_2670_44363)">
              <path d="M16 30.5C12.287 30.5 8.72601 29.025 6.1005 26.3995C3.475 23.774 2 20.213 2 16.5C2 12.787 3.475 9.22601 6.1005 6.6005C8.72601 3.975 12.287 2.5 16 2.5C19.713 2.5 23.274 3.975 25.8995 6.6005C28.525 9.22601 30 12.787 30 16.5C30 20.213 28.525 23.774 25.8995 26.3995C23.274 29.025 19.713 30.5 16 30.5ZM16 32.5C20.2435 32.5 24.3131 30.8143 27.3137 27.8137C30.3143 24.8131 32 20.7435 32 16.5C32 12.2565 30.3143 8.18687 27.3137 5.18629C24.3131 2.18571 20.2435 0.5 16 0.5C11.7565 0.5 7.68687 2.18571 4.68629 5.18629C1.68571 8.18687 0 12.2565 0 16.5C0 20.7435 1.68571 24.8131 4.68629 27.8137C7.68687 30.8143 11.7565 32.5 16 32.5Z" fill="#7BAFDF"/>
              <path d="M16 8.5C16.2652 8.5 16.5196 8.60536 16.7071 8.79289C16.8946 8.98043 17 9.23478 17 9.5V15.5H23C23.2652 15.5 23.5196 15.6054 23.7071 15.7929C23.8946 15.9804 24 16.2348 24 16.5C24 16.7652 23.8946 17.0196 23.7071 17.2071C23.5196 17.3946 23.2652 17.5 23 17.5H17V23.5C17 23.7652 16.8946 24.0196 16.7071 24.2071C16.5196 24.3946 16.2652 24.5 16 24.5C15.7348 24.5 15.4804 24.3946 15.2929 24.2071C15.1054 24.0196 15 23.7652 15 23.5V17.5H9C8.73478 17.5 8.48043 17.3946 8.29289 17.2071C8.10536 17.0196 8 16.7652 8 16.5C8 16.2348 8.10536 15.9804 8.29289 15.7929C8.48043 15.6054 8.73478 15.5 9 15.5H15V9.5C15 9.23478 15.1054 8.98043 15.2929 8.79289C15.4804 8.60536 15.7348 8.5 16 8.5Z" fill="#7BAFDF"/>
              </g>
              <defs>
              <clipPath id="clip0_2670_44363">
              <rect width="32" height="32" fill="white" transform="translate(0 0.5)"/>
              </clipPath>
              </defs>
            </svg>
          }
          { format == "viewing" &&
            <svg  className={styles.addIcon} 
                  onClick={(e)=>{
                    e.stopPropagation();
                    handleRemoveTrackFromPlaylist(song)}
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
        </div>
      ))}
    </div>
  );
}
export default TrackList;
