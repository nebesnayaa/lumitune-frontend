import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Playlist, Track } from "../types/HomeContentData";
import { getContentHome, getPlaylistById, trackSearch } from "../api/contentService";

import defaultAvatar from "/images/defaultAvatar.png";
import styles from "../styles/pages/PlaylistPage.module.css";
import TrackList from "../components/content/TrackList";

interface PlaylistProps {
  onOpen: () => void;
}

const PlaylistPage: React.FC<PlaylistProps> = ({ onOpen }) => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const avatarUrl = user?.avatarUrl || defaultAvatar;

  const [ playlist, setPlaylist ] = useState<Playlist | null>(null);
  const [ recommendations, setRecommendations ] = useState<Track[]>()

  const [ searchQuery, setSearchQuery ] = useState("");
  const [ searchResult, setSearchResult ] = useState<Track[] | null>(null);

  const [ refresh, setRefresh ] = useState(false);

  useEffect(() => {
    onOpen(); // Закриття бічної панелі
  }, []);

  useEffect(() => {
    if (!id) return;
    const fetchPlaylists = async () => {
      const data = await getPlaylistById(id);
      setPlaylist(data);
    };
    const fetchReccomendations = async () => {
      const data = await getContentHome();
      setRecommendations(data?.recommendations);
    }
    fetchPlaylists();
    fetchReccomendations();
    setSearchQuery("");
    setSearchResult(null);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const refreshPlaylist = async () => {
      const playlist = await getPlaylistById(id);
      setPlaylist(playlist);
    };
    refreshPlaylist();
    setSearchQuery("");
    setSearchResult(null);
  }, [refresh]);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      const data = await trackSearch(searchQuery);
      setSearchResult(data || []);
    } else {
      setSearchResult(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  
  if(!playlist) return <></>;

  return (
    <div className={styles.container}>
      {/* Заголовок */}
      <div className={styles.headerBlock}>
        <p className={styles.text}>Плейлист</p>
        <p className={styles.title}>{playlist?.name}</p>
      </div>
      <div className={styles.profileSection}>
        <div className={styles.avatarFrame}>
          <img
            src={avatarUrl}
            alt=""
            className={styles.avatar}
            draggable="false"
          />
        </div>
        <p className={styles.username}>{user?.username}</p>
        <div className={styles.dot}></div>
        <p className={styles.tracksAmount}>{playlist.tracks.length} треків</p>
      </div>

      {/* Список треків */}
      { playlist.tracks.length > 0 &&
        <div className={styles.listBlock}>
          <div className={styles.listHeader}>
            <p className={styles.albumHeader}>Альбом</p>
            <p className={styles.dateHeader}>Дата релізу</p>
            <p className={styles.durationHeader}>Час</p>
          </div>

          <TrackList playlistId={playlist.id} songs={playlist.tracks} format="viewing" onTrackChange={() => setRefresh(prev=>!prev)}/>
        </div>
      }   

      {/* Пошук */}
      <div className={styles.searchBlock}>
        <div className={styles.searchBar}>
          <svg className={styles.searchIcon} onClick={handleSearch} width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.0324 1.27893C5.8516 1.27893 1.62543 5.41887 1.62543 10.5579C1.62543 15.697 5.8516 19.8369 11.0324 19.8369C13.2664 19.8369 15.3229 19.0671 16.9396 17.7794L21.2923 22.132C21.6828 22.5226 22.316 22.5226 22.7065 22.132C23.097 21.7415 23.097 21.1083 22.7065 20.7178L18.3628 16.3741C19.661 14.7849 20.4394 12.7634 20.4394 10.5579C20.4394 5.41887 16.2132 1.27893 11.0324 1.27893ZM3.62543 10.5579C3.62543 6.55226 6.92713 3.27893 11.0324 3.27893C15.1377 3.27893 18.4394 6.55226 18.4394 10.5579C18.4394 14.5636 15.1377 17.8369 11.0324 17.8369C6.92713 17.8369 3.62543 14.5636 3.62543 10.5579Z" fill="#AAE4FF"/>
          </svg>
          <input 
            type="text" 
            placeholder="Пошук треків та виконавців..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        { searchResult && <TrackList playlistId={playlist.id} songs={searchResult} format="adding" onTrackChange={() => setRefresh(prev=>!prev)}/>}
        { searchResult && searchResult.length === 0 && 
          <div className={styles.badSearch}>
            <h2 className={styles.badSearchTitle}>За вашим запитом нічого не знайдено :(</h2>
            <p className={styles.badSearchText}>Перевірте, чи немає помилок у запиті, скоротіть його або перефразуйте.</p>
          </div>
        }
      </div>
      
      {/* Рекомендації */}
      { playlist.tracks.length == 0 && 
        <div className={styles.recommandationsBlock}>
          <h2 className={styles.recTitle}>Рекомендації</h2>
          <p className={styles.recText}>На основі ваших вподобань</p>
          {recommendations && <TrackList playlistId={playlist.id} songs={recommendations} format="adding" onTrackChange={() => setRefresh(prev=>!prev)}/>}
        </div>
      }
    </div>
  );
}

export default PlaylistPage;