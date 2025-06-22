import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Playlist, Track } from "../types/HomeContentData";

import { getPlaylistFavorites, getPlaylistsByUserId } from "../api/playlistService";
import { getUserByUsername } from "../api/userService";

import TrackCards from "../components/content/TrackCards";
import PlaylistCards from "../components/content/PlaylistCards";

import styles from "../styles/pages/Mediateka.module.css";

const Mediateka: React.FC = () => {
  const { user } = useAuth();
  const [ playlists, setPlaylists ] = useState<Playlist[] | null>(null);
  const [ favorites, setFavorites ] = useState<Track[] | null>(null);

  useEffect(() => {
    if(!user) return;
    const fetchContent = async () => {
      const userId = await getUserByUsername(user.username);
      const playlists = await getPlaylistsByUserId(userId.id);
      const favorites = await getPlaylistFavorites();
      if (playlists) setPlaylists(playlists);
      if (favorites) setFavorites(favorites.tracks);
    };

    fetchContent();
  }, [user]);

  if(!user) 
    return (
      <h2 className={styles.title}>Будь-ласка, увійдіть</h2>
    );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Моя медіатека</h2>
      <div>
        {favorites && <TrackCards songs={favorites} title={"Ваші вподобання"}/>}
      </div>
      <div id="playlists">
        {playlists && <PlaylistCards playlists={playlists} />}
      </div>
    </div>
    
  );
}

export default Mediateka;
