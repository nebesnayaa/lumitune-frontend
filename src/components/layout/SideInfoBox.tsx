import React, { useEffect, useState } from "react";
import { usePlayer } from "../../context/PlayerContext";
import { Link } from "react-router";
import { getTrackById } from "../../api/contentService";

import defaultCover from "/images/defaultPlaylist.png";
import styles from "../../styles/layout/SideInfoBox.module.css";

interface SideInfoBoxProps {
  onClose: () => void;
}

const SideInfoBox: React.FC<SideInfoBoxProps> = ({ onClose }) => {
  const { currentTrack } = usePlayer();
  const [ currentArtist, setCurrentArtist ] = useState<any>(null);
  const [ isSubscribed, setIsSubscribed ] = useState<any>(false);
  
  useEffect(()=> {
    if(!currentTrack) return;
    const fetchTrack = async () =>{
      const currentArtist = await getTrackById(currentTrack.id);
      setCurrentArtist(currentArtist);
    }
    fetchTrack();
  }, [currentTrack]);

  const handleFollowClick = () => {
    setIsSubscribed(!isSubscribed);
  }
  
  if (!currentTrack) return null;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <button className={styles.closeBtn} onClick={onClose}>
          <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.0001 8.55059L1.7501 13.8006C1.6001 13.9506 1.4251 14.0256 1.2251 14.0256C1.0251 14.0256 0.850098 13.9506 0.700098 13.8006C0.550098 13.6506 0.475098 13.4756 0.475098 13.2756C0.475098 13.0756 0.550098 12.9006 0.700098 12.7506L5.9501 7.50059L0.700098 2.25059C0.550098 2.10059 0.475098 1.92559 0.475098 1.72559C0.475098 1.52559 0.550098 1.35059 0.700098 1.20059C0.850098 1.05059 1.0251 0.975586 1.2251 0.975586C1.4251 0.975586 1.6001 1.05059 1.7501 1.20059L7.0001 6.45059L12.2501 1.20059C12.4001 1.05059 12.5751 0.975586 12.7751 0.975586C12.9751 0.975586 13.1501 1.05059 13.3001 1.20059C13.4501 1.35059 13.5251 1.52559 13.5251 1.72559C13.5251 1.92559 13.4501 2.10059 13.3001 2.25059L8.0501 7.50059L13.3001 12.7506C13.4501 12.9006 13.5251 13.0756 13.5251 13.2756C13.5251 13.4756 13.4501 13.6506 13.3001 13.8006C13.1501 13.9506 12.9751 14.0256 12.7751 14.0256C12.5751 14.0256 12.4001 13.9506 12.2501 13.8006L7.0001 8.55059Z" fill="#7BAFDF"/>
          </svg>
        </button>
        <h2 className={styles.header}>Track info</h2>
        <img src={currentTrack.coverUrl || defaultCover} alt="Album cover" className={styles.albumCover}/>
        <div className={styles.trackInfo}>
          <p className={styles.trackName}>{currentTrack.name}</p>
          {currentArtist &&
          <Link to={`/artist/${currentArtist.artist.id}`}>
            <p className={styles.trackAuthor}>{currentTrack.artistName}</p>
          </Link>}
          <svg className={styles.addTrackIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_2573_35768)">
            <path d="M12 22.5C9.21523 22.5 6.54451 21.3938 4.57538 19.4246C2.60625 17.4555 1.5 14.7848 1.5 12C1.5 9.21523 2.60625 6.54451 4.57538 4.57538C6.54451 2.60625 9.21523 1.5 12 1.5C14.7848 1.5 17.4555 2.60625 19.4246 4.57538C21.3938 6.54451 22.5 9.21523 22.5 12C22.5 14.7848 21.3938 17.4555 19.4246 19.4246C17.4555 21.3938 14.7848 22.5 12 22.5ZM12 24C15.1826 24 18.2348 22.7357 20.4853 20.4853C22.7357 18.2348 24 15.1826 24 12C24 8.8174 22.7357 5.76516 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0C8.8174 0 5.76516 1.26428 3.51472 3.51472C1.26428 5.76516 0 8.8174 0 12C0 15.1826 1.26428 18.2348 3.51472 20.4853C5.76516 22.7357 8.8174 24 12 24Z" fill="#7BAFDF"/>
            <path d="M12 6C12.1989 6 12.3897 6.07902 12.5303 6.21967C12.671 6.36032 12.75 6.55109 12.75 6.75V11.25H17.25C17.4489 11.25 17.6397 11.329 17.7803 11.4697C17.921 11.6103 18 11.8011 18 12C18 12.1989 17.921 12.3897 17.7803 12.5303C17.6397 12.671 17.4489 12.75 17.25 12.75H12.75V17.25C12.75 17.4489 12.671 17.6397 12.5303 17.7803C12.3897 17.921 12.1989 18 12 18C11.8011 18 11.6103 17.921 11.4697 17.7803C11.329 17.6397 11.25 17.4489 11.25 17.25V12.75H6.75C6.55109 12.75 6.36032 12.671 6.21967 12.5303C6.07902 12.3897 6 12.1989 6 12C6 11.8011 6.07902 11.6103 6.21967 11.4697C6.36032 11.329 6.55109 11.25 6.75 11.25H11.25V6.75C11.25 6.55109 11.329 6.36032 11.4697 6.21967C11.6103 6.07902 11.8011 6 12 6Z" fill="#7BAFDF"/>
            </g>
            <defs>
            <clipPath id="clip0_2573_35768">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
            </defs>
          </svg>
        </div>
        <div className={styles.authorInfo}>
          { currentArtist && 
            <Link to={`/artist/${currentArtist.artist.id}`}>
              <img src={currentArtist.artist.user.avatar?.url} alt="Album cover" className={styles.authorImg}/>
              <p className={styles.authorName}>{currentTrack.artistName}</p>
            </Link>
          }
          <div className={styles.subscribeSection}>
            { currentArtist && 
              <p className={styles.followings}>
                {currentArtist.artist.monthlyListeners} слухачів за місяць
              </p>
            }
            { isSubscribed ? 
              <button className={`${styles.subscribeBtn} ${styles.unsubscribeBtn}`} onClick={handleFollowClick}>Відписатися</button>
              : 
              <button className={styles.subscribeBtn} onClick={handleFollowClick}>Підписатися</button>
            }
          </div>
          {currentArtist && <p className={styles.bio}>{currentArtist.artist.bio}
          </p>}
        </div>
      </div>
    </div>
  );
}

export default SideInfoBox;