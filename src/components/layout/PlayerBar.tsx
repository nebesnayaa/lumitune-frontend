import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { usePlayer } from "../../context/PlayerContext";
import { addTrackToPlaylist, getAlbumById, getPlaylistFavorites, getTrackById, removeTrackFromPlaylist, updateTrackListeners } from "../../api/contentService";
import { getArtistById, updateArtistListeners } from "../../api/userService";
import { Artist } from "../../types/UserData";

import defaultCover from "/images/defaultPlaylist.png";
import styles from "../../styles/layout/PlayerBar.module.css";

interface PlayerBarProps {
  onOpenSide: () => void;
}

const PlayerBar: React.FC<PlayerBarProps> = ({ onOpenSide }) => {
  const { currentTrack, isPlaying, togglePlayPause, audioRef, volume, setVolume } = usePlayer();
  const audio = audioRef.current;

  const [ currentArtist, setCurrentArtist ] = useState<Artist>();
  const [ albumCover, setAlbumCover ] = useState<string>();
  const [ currentTime, setCurrentTime ] = useState(0); // Секундомір поточного трека
  const [ isLiked, setIsLiked ] = useState(false);

  const volumeBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!currentTrack) return;

    const fetchTrackData = async () => {
      try {
        // === Перевірка, чи трек улюблений ===
        const favorites = await getPlaylistFavorites();
        if (favorites) {
          const isFavorite = favorites.tracks.some(track => track.id === currentTrack.id);
          setIsLiked(isFavorite);
        }

        // === Завантаження повних даних треку ===
        const fullTrack = await getTrackById(currentTrack.id);
        const [album, artist] = await Promise.all([
          getAlbumById(fullTrack.albumId),
          getArtistById(fullTrack.artistId)
        ]);
        setCurrentArtist(artist);
        setAlbumCover(album.cover?.url);

        // === Оновлення прослуховувань ===
        await Promise.all([
          updateArtistListeners(artist.id),
          updateTrackListeners(fullTrack.id)
        ]);
      } catch (error) {
        console.error("Помилка при завантаженні даних треку:", error);
      }
    };

    fetchTrackData();
  }, [currentTrack]);

  // === Програвання / пауза ===
  useEffect(() => { 
    if (!audio || !currentTrack) return;

    if (isPlaying) {
      // Спроба автозапуску треку (може бути заблоковано політиками браузера)
      audio.play().catch((error) => {
        console.warn("Автовідтворення не дозволене:", error);
      });
    } else {
      audio.pause();
    }
    
  }, [audio]);

  // === Синхронізація часу ===
  useEffect(() => {    
    if (!audio) return;
    // setCurrentTime(0);
    const updateTime = () => {
      setCurrentTime(audio.currentTime)
    };
    
    audio.addEventListener('timeupdate', updateTime);
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
    };
  }, [audio]);

  const handleLikeToggle = async(trackId: string) => {
    const favorites = await getPlaylistFavorites();
    if(!favorites) return;
    if(!isLiked){
      await addTrackToPlaylist(trackId, favorites.id);
    }
    else{
      await removeTrackFromPlaylist(trackId, favorites.id);
    }
    setIsLiked(prev => !prev);
  }

  /* Управління звуком аудіо */
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => { /* Обробник натискання миші на слайдер гучності: встановлює нову гучність та слухає рух миші для динамічної зміни */
    updateVolume(e.clientX);
    const handleMouseMove = (e: MouseEvent) => updateVolume(e.clientX);
    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const updateVolume = (clientX: number) => { /* Обчислення нової гучності на основі позиції миші відносно слайдеру гучності */
    const bar = volumeBarRef.current;
    if (!bar) return;

    const rect = bar.getBoundingClientRect();
    let newVolume = (clientX - rect.left) / rect.width;
    newVolume = Math.max(0, Math.min(1, newVolume)); // обмежуємо між 0 і 1
    setVolume(newVolume);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => { /* Обробник клавіш вліво/вправо для зменшення/збільшення гучності */
    if (e.key === 'ArrowLeft') {
      setVolume(Math.max(0, volume - 0.05));
    } else if (e.key === 'ArrowRight') {
      setVolume(Math.min(1, volume + 0.05));
    }
  };

  /* Управління програванням аудіо */
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audio || !currentTrack) return;

    const trackLine = e.currentTarget;
    const rect = trackLine.getBoundingClientRect();

    const clickX = e.clientX - rect.left;
    const width = rect.width;

    const percent = clickX / width;
    const newTime = percent * currentTrack.duration;
    
    if (audio.readyState >= 2) {
      audio.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentTrack) return null;

  return (
    <div className={styles.playerBar} onClick={onOpenSide}>
      <audio 
        ref={audioRef} 
        onCanPlay={() => {
          if (isPlaying) {
            audioRef.current?.play();
          }
        }}
        style={{ display: "none" }}
      >
        {currentTrack && <source src={currentTrack.url} type="audio/mpeg" />}
      </audio>

      <div className={styles.wideScreen}>
        {/* Блок ліворуч */}
        <div className={styles.trackInfo}>
          <img className={styles.trackPoster} src={albumCover || defaultCover} alt="" />
          <div className={styles.trackText}>
            <p className={styles.trackName}>
              {currentTrack.name.length > 20 ? (
                <span className={styles.scrollText}>
                  {currentTrack.name}&nbsp;&nbsp;&nbsp;&nbsp;{currentTrack.name}
                </span>
              ) : (
                currentTrack.name
              )}
            </p>
            { currentArtist &&
              <Link to={`/artist/${currentArtist.id}`}>
                <p className={styles.trackAuthor}>{currentArtist.user.username}</p>
              </Link>
            }
          </div>
          <div className={styles.icons}>
            <div className={styles.heartIcon} onClick={()=>handleLikeToggle(currentTrack.id)}>
              { isLiked ? (
                <svg width="20" height="23" viewBox="1 -0.5 22 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15.5 19L12 21L9 19.5L5.5 17L3.5 13.5L2.5 9L5 5H9L12 6.5L14 5.5L17 4.5L20 6.5L21.5 9.5L20.5 14L15.5 19Z" fill="url(#paint0_linear_35_360)"/>
                <path d="M12 6.40707L11.4934 6.89466C11.6259 7.03237 11.8088 7.11019 12 7.11019C12.1912 7.11019 12.3741 7.03237 12.5066 6.89466L12 6.40707ZM9.58692 18.427C8.16599 17.3068 6.61225 16.213 5.37965 14.825C4.17114 13.4642 3.32812 11.8763 3.32812 9.81625H1.92188C1.92188 12.3152 2.96297 14.2215 4.32817 15.7587C5.66927 17.2689 7.37885 18.477 8.71633 19.5313L9.58692 18.427ZM3.32812 9.81625C3.32812 7.79981 4.46753 6.10884 6.02284 5.39791C7.53382 4.70723 9.56406 4.89014 11.4934 6.89466L12.5066 5.91948C10.2173 3.54103 7.56008 3.14902 5.43821 4.11893C3.36067 5.06859 1.92188 7.27369 1.92188 9.81625H3.32812ZM8.71633 19.5313C9.19655 19.9099 9.71207 20.3136 10.2345 20.6189C10.7568 20.9241 11.3527 21.1721 12 21.1721V19.7658C11.7098 19.7658 11.3682 19.6527 10.944 19.4048C10.52 19.157 10.0801 18.8157 9.58692 18.427L8.71633 19.5313ZM15.2837 19.5313C16.6211 18.477 18.3307 17.2689 19.6718 15.7587C21.037 14.2215 22.0781 12.3152 22.0781 9.81625H20.6719C20.6719 11.8763 19.8289 13.4642 18.6203 14.825C17.3877 16.213 15.834 17.3068 14.4131 18.427L15.2837 19.5313ZM22.0781 9.81625C22.0781 7.27369 20.6393 5.06859 18.5618 4.11893C16.4399 3.14902 13.7827 3.54103 11.4934 5.91948L12.5066 6.89466C14.4359 4.89014 16.4662 4.70723 17.9771 5.39791C19.5324 6.10884 20.6719 7.79981 20.6719 9.81625H22.0781ZM14.4131 18.427C13.9199 18.8157 13.48 19.157 13.056 19.4048C12.6318 19.6527 12.2902 19.7658 12 19.7658V21.1721C12.6473 21.1721 13.2432 20.9241 13.7655 20.6189C14.288 20.3136 14.8034 19.9099 15.2837 19.5313L14.4131 18.427Z" fill="#93D3E7"/>
                <defs>
                <linearGradient id="paint0_linear_35_360" x1="12" y1="4.5" x2="12" y2="21" gradientUnits="userSpaceOnUse">
                <stop stopColor="#0059FF"/>
                <stop offset="1" stopColor="#6FBAFF"/>
                </linearGradient>
                </defs>
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 -1 22 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 3.40707L10.4934 3.89466C10.6259 4.03237 10.8088 4.11019 11 4.11019C11.1912 4.11019 11.3741 4.03237 11.5066 3.89466L11 3.40707ZM8.58692 15.427C7.16599 14.3068 5.61225 13.213 4.37965 11.825C3.17114 10.4642 2.32812 8.87628 2.32812 6.81625H0.921875C0.921875 9.31521 1.96297 11.2215 3.32817 12.7587C4.66927 14.2689 6.37885 15.477 7.71633 16.5313L8.58692 15.427ZM2.32812 6.81625C2.32812 4.79981 3.46753 3.10884 5.02284 2.39791C6.53382 1.70723 8.56406 1.89014 10.4934 3.89466L11.5066 2.91948C9.21734 0.541029 6.56008 0.149022 4.43821 1.11893C2.36067 2.06859 0.921875 4.27369 0.921875 6.81625H2.32812ZM7.71633 16.5313C8.19655 16.9099 8.71207 17.3136 9.2345 17.6189C9.75678 17.9241 10.3527 18.1721 11 18.1721V16.7658C10.7098 16.7658 10.3682 16.6527 9.944 16.4048C9.51997 16.157 9.08008 15.8157 8.58692 15.427L7.71633 16.5313ZM14.2837 16.5313C15.6211 15.477 17.3307 14.2689 18.6718 12.7587C20.037 11.2215 21.0781 9.31521 21.0781 6.81625H19.6719C19.6719 8.87628 18.8289 10.4642 17.6203 11.825C16.3877 13.213 14.834 14.3068 13.4131 15.427L14.2837 16.5313ZM21.0781 6.81625C21.0781 4.27369 19.6393 2.06859 17.5618 1.11893C15.4399 0.149022 12.7827 0.541029 10.4934 2.91948L11.5066 3.89466C13.4359 1.89014 15.4662 1.70723 16.9771 2.39791C18.5324 3.10884 19.6719 4.79981 19.6719 6.81625H21.0781ZM13.4131 15.427C12.9199 15.8157 12.48 16.157 12.056 16.4048C11.6318 16.6527 11.2902 16.7658 11 16.7658V18.1721C11.6473 18.1721 12.2432 17.9241 12.7655 17.6189C13.288 17.3136 13.8034 16.9099 14.2837 16.5313L13.4131 15.427Z" fill="#93D3E7"/>
                </svg>
              )}
            </div>
            <svg className={styles.plusIcon} width="15" height="15" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M8 11V19H11V11H19V8L11 8V0H8V8L0 8V11H8Z" fill="#93D3E7"/>
            </svg>
          </div>
        </div>
        {/* Controls mobile */}
        <div className={styles.icons_mobile}>
          <div className={styles.iconPlus_mobile} onClick={()=>handleLikeToggle(currentTrack.id)}>
            { isLiked ? (
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 7.63333L7.5189 13.8881C7.98801 14.4197 8.84607 14.3079 9.16316 13.6737L15 2" stroke="#7BAFDF" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>) : (
              <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18.5V0.5" stroke="#40A2FF" strokeWidth="3"/>
                <path d="M0 9.5L18 9.5" stroke="#40A2FF" strokeWidth="3"/>
              </svg>
            )}
          </div>
          <div className={styles.iconPlay_mobile} onClick={(e) => { e.stopPropagation(); togglePlayPause(); }}>
            { isPlaying ? (
              <img src="/images/icons/pauseIcon_mobile.svg" alt="" />
              ) : (
              <img src="/images/icons/playIcon_mobile.svg" alt="" />)
            }
          </div>
        </div>
        
        {/* Аудіо-строка */}
        <div className={styles.trackField}>
          <div className={styles.controlButtons}>
            <svg width="15" height="12" viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12.9156 11.9856H4.84157L4.84157 5.70577H7.41497L3.94445 0.5L0.473938 5.70577L3.04734 5.70577L3.04733 13.7798L12.9156 13.7798V11.9856ZM7.08436 3.01442L15.1584 3.01442L15.1584 9.29425H12.585L16.0555 14.5L19.5261 9.29425L16.9527 9.29425V1.22019L7.08436 1.22019L7.08436 3.01442Z" fill="#93D3E7"/>
            </svg>
            <svg width="12" height="12" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M2.52606 8.1547V14H0.526062V7V0H2.52606V5.8453L12.5261 0.0717964V13.9282L2.52606 8.1547Z" fill="#93D3E7"/>
            </svg>
            <div onClick={(e) => { e.stopPropagation(); togglePlayPause(); }}>
            {isPlaying ? (
              <img src="/images/icons/pauseIcon.svg"/>
            ) : (
              <img src="/images/icons/playIcon.svg"/>
            )}
            </div>
            <svg width="12" height="12" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M10.5261 8.1547V14H12.5261V7V0H10.5261V5.8453L0.526062 0.0717964V13.9282L10.5261 8.1547Z" fill="#93D3E7"/>
            </svg>
            <svg width="15" height="12" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M11.5785 4.18421H10.4297L8.16764 6.67474L7.07711 5.68295L9.55879 2.95147C9.62788 2.87554 9.71207 2.81489 9.80597 2.7734C9.89987 2.7319 10.0014 2.71049 10.1041 2.71053H11.5785V0.5L15.2627 3.49305L11.5785 6.39474V4.18421ZM10.43 10.8158H11.5788V8.60526L15.263 11.5526L11.5788 14.5V12.2895H10.1043C10.0017 12.2895 9.90015 12.2681 9.80625 12.2266C9.71235 12.1851 9.62816 12.1245 9.55907 12.0485L6.42086 8.59569L3.28265 12.0493C3.21356 12.1252 3.12937 12.1858 3.03547 12.2273C2.94157 12.2688 2.84004 12.2902 2.73739 12.2902H0.526123V10.8165H2.4117L5.42539 7.5L2.4117 4.18421H0.526123V2.71053H2.73739C2.84004 2.71049 2.94157 2.7319 3.03547 2.7734C3.12937 2.81489 3.21356 2.87554 3.28265 2.95147L10.43 10.8158Z" fill="#93D3E7"/>
            </svg>
          </div>
          <div className={styles.controlTrack}>
            <p className={styles.currentDuration}>{formatTime(currentTime)}</p>
            <div className={styles.trackLine} onClick={handleProgressClick}>
              <div className={styles.trackLineActive} 
                  style={{ 
                    width: `${(currentTime / currentTrack.duration) * 100}%` 
                  }}>
              </div>
            </div>
            <p className={styles.trackDuration}>
              {formatTime(currentTrack.duration)}
            </p>
          </div>
        </div>

        {/* Блок праворуч */}
        <div className={styles.volumeBlock}>
          <div className={styles.volumeBar} tabIndex={0} onKeyDown={handleKeyDown}>
            <svg className={styles.volumeIcon} width="16" height="19" viewBox="0 0 16 19" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M13.1537 0L15.3461 7.12501V9.50002H13.1537L13.1537 0ZM13.1537 19.0001L15.3461 11.875V9.50005H13.1537L13.1537 19.0001ZM0 7.30766L8.76928 0.730725V9.49997V18.2692L0 11.6923V9.49997V7.30766ZM11.6924 7.85587L10.2309 2.92317V9.5001V16.077L11.6924 11.1443V9.5001L11.6924 7.85587Z" fill="#93D3E7"/>
            </svg>
            <div className={styles.volumeLine} ref={volumeBarRef} onMouseDown={handleMouseDown}>
              <div className={styles.volumeFill} style={{ width: `${volume * 100}%` }}></div>
            </div>
          </div>
          <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M4 2H17V15H7V9H4V2ZM2 9V2V0H4H17H19V2V15V17H17H7V19H0V9H2Z" fill="#93D3E7"/>
          </svg>
        </div>
      </div>
      
      <div className={styles.mobileScreen}>
        <div className={styles.trackLine_mobile}>
          <div className={styles.trackLineActive_mobile} style={{ width: `${(currentTime / currentTrack.duration) * 100}%` }}></div>
        </div>
      </div>
    </div>
  );
  }
  
  export default PlayerBar;