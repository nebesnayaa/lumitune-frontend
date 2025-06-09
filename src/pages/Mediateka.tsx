import React, { useEffect, useState } from "react";
// import { Playlist, Track } from "../types/HomeContentData";
import { Playlist } from "../types/HomeContentData";
import { getPlaylistsByUserId } from "../api/contentService";
import { useAuth } from "../context/AuthContext";
import { getUserByUsername } from "../api/userService";
// import TrackCards from "../components/home/TrackCards";
import PlaylistCards from "../components/content/PlaylistCards";

import styles from "../styles/pages/Mediateka.module.css";


const Mediateka: React.FC = () => {
  const { user } = useAuth();
  const [ playlists, setPlaylists ] = useState<Playlist[] | null>(null);
  // const [ favorites, setFavorites ] = useState<Track[] | null>(null);

  useEffect(() => {
    if(!user) return;
    const fetchContent = async () => {
      const userId = await getUserByUsername(user.username);
      const playlists = await getPlaylistsByUserId(userId.id);
      // const favorites = await getFavorites(userId.id);
      if (playlists) setPlaylists(playlists);
      // if (favorites) setFavorites(favorites);
    };

    fetchContent();
  }, [user]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Моя медіатека</h2>
      <div>
        {/* {favorites && <TrackCards songs={favorites} />} */}
      </div>
      <div id="playlists">
        {playlists && <PlaylistCards playlists={playlists} />}
      </div>
    </div>
    
  );
}

export default Mediateka;
