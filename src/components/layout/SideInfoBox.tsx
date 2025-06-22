import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../../context/AuthContext";
import { usePlayer } from "../../context/PlayerContext";

import { getAlbumById } from "../../api/albumService";
import { getArtistById } from "../../api/artistService";
import { getTrackById } from "../../api/trackService";

import defaultCover from "/images/defaultPlaylist.png";
import styles from "../../styles/layout/SideInfoBox.module.css";


interface SideInfoBoxProps {
  onClose: () => void;
}

const SideInfoBox: React.FC<SideInfoBoxProps> = ({ onClose }) => {
  const { user } = useAuth();
  const { currentTrack } = usePlayer();
  const [ albumCover, setAlbumCover ] = useState<string>();
  const [ currentArtist, setCurrentArtist ] = useState<any>(null);
  const [ isSubscribed, setIsSubscribed ] = useState<any>(false);
  
  useEffect(()=> {
    if(!currentTrack) return;
    const fetchTrack = async () =>{
      const detailedTrack = await getTrackById(currentTrack.id);
      const album = await getAlbumById(detailedTrack.albumId);
      const currentArtist = await getArtistById(detailedTrack.artistId);
      setCurrentArtist(currentArtist);
      setAlbumCover(album.cover?.url);
    }
    fetchTrack();
  }, [currentTrack]);

  const handleFollowClick = () => {
    setIsSubscribed(!isSubscribed);
  }
  
  if (!currentTrack || !user) return null;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <button className={styles.closeBtn} onClick={onClose}>
          <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.0001 8.55059L1.7501 13.8006C1.6001 13.9506 1.4251 14.0256 1.2251 14.0256C1.0251 14.0256 0.850098 13.9506 0.700098 13.8006C0.550098 13.6506 0.475098 13.4756 0.475098 13.2756C0.475098 13.0756 0.550098 12.9006 0.700098 12.7506L5.9501 7.50059L0.700098 2.25059C0.550098 2.10059 0.475098 1.92559 0.475098 1.72559C0.475098 1.52559 0.550098 1.35059 0.700098 1.20059C0.850098 1.05059 1.0251 0.975586 1.2251 0.975586C1.4251 0.975586 1.6001 1.05059 1.7501 1.20059L7.0001 6.45059L12.2501 1.20059C12.4001 1.05059 12.5751 0.975586 12.7751 0.975586C12.9751 0.975586 13.1501 1.05059 13.3001 1.20059C13.4501 1.35059 13.5251 1.52559 13.5251 1.72559C13.5251 1.92559 13.4501 2.10059 13.3001 2.25059L8.0501 7.50059L13.3001 12.7506C13.4501 12.9006 13.5251 13.0756 13.5251 13.2756C13.5251 13.4756 13.4501 13.6506 13.3001 13.8006C13.1501 13.9506 12.9751 14.0256 12.7751 14.0256C12.5751 14.0256 12.4001 13.9506 12.2501 13.8006L7.0001 8.55059Z" fill="#7BAFDF"/>
          </svg>
        </button>
        <h2 className={styles.header}>Детальніше</h2>
        <img src={albumCover || defaultCover} alt="Album cover" className={styles.albumCover}/>
        <div className={styles.trackInfo}>
          <p className={styles.trackName}>{currentTrack.name}</p>
          {currentArtist &&
          <Link to={`/artist/${currentArtist.id}`}>
            <p className={styles.trackAuthor}>{currentArtist.user.username}</p>
          </Link>}
        </div>
        <div className={styles.authorInfo}>
          { currentArtist && 
            <Link to={`/artist/${currentArtist.id}`}>
              <img src={currentArtist.user.avatar.url || defaultCover} alt="Album cover" className={styles.authorImg}/>
              <p className={styles.authorName}>{currentArtist.user.username}</p>
            </Link>
          }
          <div className={styles.subscribeSection}>
            { currentArtist && 
              <p className={styles.followings}>
                {currentArtist.monthlyListeners} слухачів за місяць
              </p>
            }
            { isSubscribed ? 
              <button className={`${styles.subscribeBtn} ${styles.unsubscribeBtn}`} onClick={handleFollowClick}>Відписатися</button>
              : 
              <button className={styles.subscribeBtn} onClick={handleFollowClick}>Підписатися</button>
            }
          </div>
          {currentArtist && <p className={styles.bio}>{currentArtist.bio}
          </p>}
        </div>
      </div>
    </div>
  );
}

export default SideInfoBox;