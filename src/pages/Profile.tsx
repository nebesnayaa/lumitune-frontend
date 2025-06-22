import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { Artist, User } from "../types/UserData";
import { Album, Track } from "../types/HomeContentData";

import { getCurrentUser, editUser, isUsernameUnique } from "../api/userService";
import { editArtistById, getArtistByUserId } from "../api/artistService";
import { deleteImage, getGenres, getMoods, uploadImage } from "../api/contentService";
import { createTrack } from "../api/trackService";
import { getPlaylistFavorites } from "../api/playlistService";
import { createAlbum, getAlbumById, getAlbums } from "../api/albumService";

import AlbumCards from "../components/content/AlbumCards";
import TrackCards from "../components/content/TrackCards";

import defaultAvatar from "/images/defaultAvatar.png";
import styles from "../styles/pages/Profile.module.css";

interface ProfileProps {
  onOpen: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onOpen }) => {
  const { user, refreshUser } = useAuth();
  const avatarUrl = user?.avatarUrl || defaultAvatar;
  
  const [ subscribers, setSubscribers ] = useState<number>(0);  // Шапка профілю
  const [ followings, setFollowings ] = useState<number>(0);
  const [ musicAmount, setMusicAmount ] = useState<number>(0);
  const [ bio, setBio ] = useState<string>();

  const [ isAuthor, setIsAuthor ] = useState(false);
  const [ artist, setArtist ] = useState<Artist>();          
  const [ albums, setAlbums ] = useState<Album[] | null>();  // Всі альбоми артиста
  const [ allTracks, setAllTracks ] = useState<Track[] | null>();  // Всі треки артиста
  const [ favorites, setFavorites ] = useState<Track[] | null>(null);

  const [ isEditModalOpen, setIsEditModalOpen ] = useState(false);               // Поля для редагування користувача
  const [ selectedFile, setSelectedFile ] = useState<File | null>(null);
  const [ selectedName, setSelectedName ] = useState<string | null>(null);
  const [ selectedBio, setSelectedBio ] = useState<string | null>(null);
  const [ errorUserName, setErrorUserName ] = useState<string>();
  const [ isEditAllowed, setIsEditAllowed ] = useState<boolean>(true);

  const [ isCreateAlbumModalOpen, setIsCreateAlbumModalOpen ] = useState(false); // Поля для створення альбому
  const [ selectedAlbumName, setSelectedAlbumName ] = useState<string>();     
  const [ selectedCover, setSelectedCover ] = useState<File | null>(null);

  const [ isCreateTrackModalOpen, setIsCreateTrackModalOpen ] = useState(false); // Поля для створення треку
  const [ selectedTrackName, setSelectedTrackName ] = useState<string>();     
  const [ selectedAudio, setSelectedAudio ] = useState<File | null>(null); 
  const [ selectedAlbumId, setSelectedAlbumId ] = useState<string>();
  const [ selectedGenre, setSelectedGenre ] = useState<string>();
  const [ selectedMood, setSelectedMood ] = useState<string>();

  const moods = [
    { label: "Хеппі" },
    { label: "Меланхолія" },
    { label: "Романтика" },
    { label: "Драйв" },
    { label: "Туса" },
    { label: "Чілл" },
    { label: "Фан" },
  ];
  const genres = [
    { label: "Новинки" },
    { label: "Поп" },
    { label: "K-pop" },
    { label: "Рок" },
    { label: "Метал" },
    { label: "Реп" },
    { label: "Класика" },
  ];
  const [ moodNames, setMoodNames ] = useState<string[]>([]);
  const [ genreNames, setGenreNames ] = useState<string[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    onOpen(); // Закриття бічної панелі
    if (user) {
      getCurrentUser()
        .then(async(data) => {
          setSelectedName(data.username);
          setSubscribers(data.accSubscribers || 0);
          setFollowings(data.accFollowings || 0);
          
          if(data.userData.isArtist === true){
            setIsAuthor(true);
            const artist = await getArtistByUserId(data.id);
            setMusicAmount(artist.albums.length);
            setBio(artist.bio || "Welcome to my page!");
            setSelectedBio(artist.bio || "Welcome to my page!");
            
            const albums = await getAlbums(artist.id);
            setArtist(artist);
            setAlbums(albums);
          }
          const favorites = await getPlaylistFavorites();
          if(favorites) setFavorites(favorites?.tracks);
        })
        .catch((err) => {
          console.error("Не вдалося отримати дані користувача:", err);
        });
    }
  }, [user]);

  useEffect(() => {
    if(!albums) return;

    const fetchAllTracks = async () => {
    try {
      const trackArrays = await Promise.all(
        albums.map(async (album) => {
          const fullAlbum = await getAlbumById(album.id);
          return fullAlbum?.tracks || []; // повертаємо масив треків
        })
      );

      const flattened = trackArrays.flat(); // зливаємо всі масиви в один
      setAllTracks(flattened);
    } catch (error) {
      console.error("Помилка при отриманні треків альбомів:", error);
    }
  };

  fetchAllTracks();
  }, [albums]);

  const handleUsernameBlur = async() => {
    if(!selectedName?.trim()) {
      setErrorUserName("");
      return;
    }
    try {
      const isUnique = await isUsernameUnique(selectedName.trim());
        setErrorUserName(isUnique ? ""   : "Це ім’я вже зайняте.");
        setIsEditAllowed(isUnique ? true : false);
    } catch (error) {
      console.error(error);
      setErrorUserName("Помилка перевірки імені. Спробуйте пізніше.");
    }
  }
  const handleEditUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      let avatarToUpdate = currentUser.avatar;
      const oldAvatarId = currentUser.avatar?.id;

      if(selectedFile){
        const formData = new FormData();
        formData.append("file", selectedFile);

        const uploadedImage  = await uploadImage(formData);
        if (!uploadedImage) throw new Error("Не вдалося завантажити зображення");
        avatarToUpdate = uploadedImage;
      }
      if(isAuthor){
        const currentArtist = await getArtistByUserId(currentUser.id);
        const updatedArtist: Artist = {
          ...currentArtist,
          bio: selectedBio || currentUser.userData.bio,
        }
        await editArtistById(currentArtist.id, updatedArtist);
      }
      
      const updatedUser: User = {
        ...currentUser,
        avatar: avatarToUpdate,
        username: selectedName || currentUser.username,
      };
      console.log(updatedUser);
      await editUser(updatedUser);
      await refreshUser();
      
      if(selectedFile && oldAvatarId)
      {
        await deleteImage(oldAvatarId);
      }
      setIsEditModalOpen(false);

      setSelectedFile(null);
      setSelectedName(null);
      setSelectedBio(null);
    } catch (error) {
      console.error("Помилка редагування користувача:", error);
    }
  };

  const handleUploadAlbum = async () => {
    if(!selectedCover || !selectedAlbumName  || !artist) return;
    try{
      const formData = new FormData();
      formData.append("file", selectedCover);

      const uploadedImage  = await uploadImage(formData);
      if (!uploadedImage) throw new Error("Не вдалося завантажити зображення");
      
      const AlbumPayload = {
        name: selectedAlbumName,
        type: "album",
        label: "string",
        duration: 0,
        relDate: new Date(),
        cover: uploadedImage,
        artist: artist,
        tracks: [],
      }

      const created = await createAlbum(AlbumPayload);
      
      // console.log(created);
      if(created){
        setAlbums((prev) => (prev ? [...prev, created] : [created]));
        setIsCreateAlbumModalOpen(false);
      }
    } catch (error) {
      console.error("Помилка публікування альбому:", error);
    }
  }

  const handleUploadTrack = async () => {
    if(!selectedAudio || !selectedTrackName  || !artist) return;
    
    fetchgenres();
    try{
      const formData = new FormData();
      formData.append("file", selectedAudio);

      const trackPayload = {
        name: selectedTrackName,
        albumId: selectedAlbumId,
        isExplicit: false,
        duration: 0,
      };
      formData.append("track", new Blob([JSON.stringify(trackPayload)], { type: "application/json" }));

      const created = await createTrack(formData);
      console.log(created);
      if(created){
        setAllTracks(prev => prev ? [...prev, created] : [created]);
      }
      setIsCreateTrackModalOpen(false);

    } catch (error) {
      console.error("Помилка публікування треку:", error);
    }
  }

  const fetchgenres = async() => {
    const moods = await getMoods();
    const genres = await getGenres();
    setMoodNames(moods);
    setGenreNames(genres);
  }

  return (
    <div className={styles.container}>
      <div className={styles.profileBlock}>
        <div className={styles.settings}>
          <p className={styles.title}>Профіль</p>
          <div className={styles.icons}>
            <svg onClick={() => setIsEditModalOpen(true)} width="17" height="15" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.4097 0.490392C13.8512 -0.0661481 14.677 -0.163477 15.2543 0.273L17.4834 1.95839C18.0607 2.39487 18.1708 3.19987 17.7293 3.75641L6.58377 17.8069C6.1423 18.3634 5.31643 18.4608 4.73915 18.0243L2.51005 16.3389C1.93277 15.9024 1.82268 15.0974 2.26415 14.5409L13.4097 0.490392Z" fill="#DDDDDD"/>
              <path d="M0.927388 21.9461C0.467412 22.1415 -0.0442147 21.7788 0.00304506 21.2909L0.380845 17.3907C0.4293 16.8905 1.02498 16.6443 1.43557 16.9547L4.60277 19.3494C4.99876 19.6488 4.92723 20.2475 4.47238 20.4406L0.927388 21.9461Z" fill="#DDDDDD"/>
            </svg>
            <svg onClick={() => navigate("/settings")} width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M8.09375 0.75C7.88664 0.75 7.71875 0.917893 7.71875 1.125V2.58072C7.71875 2.76389 7.5861 2.91902 7.40726 2.95859C6.6934 3.11655 6.02588 3.3978 5.42818 3.77886C5.27379 3.87729 5.0704 3.86133 4.94092 3.73186L3.91144 2.70237C3.76499 2.55593 3.52756 2.55593 3.38111 2.70237L2.45303 3.63045C2.30658 3.7769 2.30658 4.01433 2.45303 4.16078L3.48237 5.19012C3.61186 5.31961 3.62781 5.52303 3.52934 5.67743C3.14803 6.27532 2.86661 6.9431 2.70859 7.65726C2.66902 7.8361 2.51389 7.96875 2.33072 7.96875H0.875C0.667893 7.96875 0.5 8.13664 0.5 8.34375V9.65625C0.5 9.86336 0.667893 10.0312 0.875 10.0312H2.33072C2.51389 10.0312 2.66902 10.1639 2.70859 10.3427C2.86661 11.0569 3.14803 11.7247 3.52934 12.3226C3.62781 12.477 3.61186 12.6804 3.48237 12.8099L2.4528 13.8395C2.30635 13.9859 2.30635 14.2233 2.4528 14.3698L3.38088 15.2979C3.52732 15.4443 3.76476 15.4443 3.91121 15.2979L4.94092 14.2681C5.0704 14.1387 5.27379 14.1227 5.42818 14.2211C6.02588 14.6022 6.6934 14.8835 7.40726 15.0414C7.5861 15.081 7.71875 15.2361 7.71875 15.4193V16.875C7.71875 17.0821 7.88664 17.25 8.09375 17.25H9.40625C9.61336 17.25 9.78125 17.0821 9.78125 16.875V15.4193C9.78125 15.2361 9.9139 15.081 10.0927 15.0414C10.8067 14.8834 11.4743 14.6021 12.072 14.221C12.2264 14.1226 12.4298 14.1385 12.5593 14.268L13.589 15.2977C13.7354 15.4442 13.9728 15.4442 14.1193 15.2977L15.0474 14.3696C15.1938 14.2232 15.1938 13.9857 15.0474 13.8393L14.0178 12.8097C13.8883 12.6802 13.8723 12.4768 13.9708 12.3224C14.352 11.7246 14.6334 11.0568 14.7914 10.3427C14.831 10.1639 14.9861 10.0312 15.1693 10.0312H16.625C16.8321 10.0312 17 9.86336 17 9.65625V8.34375C17 8.13664 16.8321 7.96875 16.625 7.96875H15.1693C14.9861 7.96875 14.831 7.8361 14.7914 7.65726C14.6334 6.94317 14.352 6.27545 13.9708 5.6776C13.8723 5.52321 13.8883 5.31979 14.0177 5.19031L15.0471 4.16094C15.1936 4.01449 15.1936 3.77705 15.0471 3.63061L14.119 2.70253C13.9726 2.55608 13.7352 2.55608 13.5887 2.70253L12.5593 3.73198C12.4298 3.86145 12.2264 3.87741 12.072 3.77897C11.4743 3.39785 10.8067 3.11656 10.0927 2.95859C9.9139 2.91902 9.78125 2.76389 9.78125 2.58072V1.125C9.78125 0.917893 9.61336 0.75 9.40625 0.75H8.09375ZM8.75 13.125C11.0282 13.125 12.875 11.2782 12.875 9C12.875 6.72183 11.0282 4.875 8.75 4.875C6.47183 4.875 4.625 6.72183 4.625 9C4.625 11.2782 6.47183 13.125 8.75 13.125Z" fill="white"/>
            </svg>
          </div>
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.avatarSection}>
            <img
              src={avatarUrl}
              alt=""
              className={styles.avatar}
              draggable="false"
            />
          </div>

          {/* Модальні вікна */}
          {isEditModalOpen && (
            <div className={styles.modalOverlay} onClick={() => setIsEditModalOpen(false)}>
              <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 className={styles.titleUpload}>Редагування профіля</h3>
                <svg className={styles.crossBtn} onClick={() => setIsEditModalOpen(false)} width="15" height="15" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.6781 9.55572L20.4562 0.777656L22.5775 2.89898L13.7995 11.677L22.5782 20.4558L20.4569 22.5771L11.6781 13.7984L2.89939 22.5771L0.778068 20.4558L9.55683 11.677L0.778758 2.89898L2.90008 0.777656L11.6781 9.55572Z" fill="#74BCC3"/>
                </svg>
                <div className={styles.editSection}>
                  <div className={styles.avatarSection}>
                    <img
                      src={avatarUrl}
                      alt=""
                      className={styles.avatar}
                      draggable="false"
                    />
                  </div>
                  <div className={styles.inputsSection}>
                    <p className={styles.label}>Нікнейм</p>
                    <input
                      type="text"
                      value={selectedName ?? user?.username ?? ""}
                      placeholder="username"
                      className={styles.inputName}
                      onChange={(e) => setSelectedName(e.target.value)}
                      onBlur={handleUsernameBlur}
                    />
                    {errorUserName && (
                      <p className={styles.errorText}>{errorUserName}</p>
                    )}
                    {isAuthor ? (
                      <div>
                        <p className={styles.label}>Опис</p>
                        <textarea
                          // type="text"
                          value={selectedBio ?? bio ?? ""}
                          placeholder="Tell about yourself"
                          className={styles.inputBio}
                          onChange={(e) => setSelectedBio(e.target.value)}
                        />
                      </div>
                    ) : (
                      <div className={styles.uploadSection}>
                        <label htmlFor="upload" className={selectedFile ? `${styles.inputUpload} ${styles.start}` : `${styles.inputUpload}`}>
                          {!selectedFile && 
                            <svg width="41" height="35" viewBox="0 0 41 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M31.9094 10.6845C30.5744 3.9276 23.9268 -0.800125 16.8736 0.819596L16.3788 0.943444C11.3217 2.33821 7.66092 7.00068 7.20239 12.3325L7.17635 12.7569C7.15824 13.1801 7.16615 13.606 7.20239 14.0713C3.10946 14.5114 -0.0117234 18.3069 0.569905 22.6878L0.625243 23.0429C1.26837 26.5589 6.33333 30.0906 13.8333 29.3334V27.5542C8.83333 28.3996 2.77003 25.4902 2.26424 22.7308L2.22192 22.4616C1.769 19.0484 4.19552 16.0944 7.37817 15.7523L8.99275 15.579L8.86417 13.9376C8.82246 13.402 8.82453 12.9464 8.86417 12.4795C9.27863 7.66044 12.6818 3.51415 17.2414 2.4676L17.8127 2.35201C23.7047 1.32249 29.154 5.34098 30.2753 11.0164L30.5243 12.278L31.7906 12.3705L32.1926 12.4101C36.1745 12.9082 39.1039 16.4068 38.8121 20.5131L38.773 20.9259C38.3095 24.7018 33 28.3996 27.1667 27.5542V29.2452C34.6667 30.0906 39.5852 26.0554 40.3616 21.5732L40.4267 21.1356C41.0917 15.7246 37.1527 11.0666 31.9094 10.6845Z" fill="#52869F"/>
                              <path d="M19.6653 18.7862L17.7561 20.7232C17.4311 21.0529 16.9027 21.0529 16.5777 20.7232C16.2528 20.3934 16.2527 19.8573 16.5777 19.5276L19.9111 16.1457C20.0192 16.0364 20.1507 15.9781 20.2887 15.941C20.3237 15.9308 20.3562 15.9246 20.3928 15.9195C20.5359 15.8994 20.6813 15.9068 20.816 15.9625C20.819 15.9642 20.8226 15.9675 20.8258 15.9691C20.919 16.0113 21.0096 16.0664 21.0878 16.1457L24.4212 19.5276C24.7476 19.8571 24.7471 20.3934 24.4228 20.7232C24.2595 20.8872 24.0453 20.9709 23.832 20.9709C23.6187 20.9708 23.4061 20.8888 23.2428 20.7232L21.332 18.7862L21.332 33.6545C21.3319 34.1212 20.9586 34.5 20.4986 34.5C20.0387 34.4999 19.6653 34.1212 19.6653 33.6545L19.6653 18.7862Z" fill="#52869F"/>
                            </svg>
                          }
                          {selectedFile ? `Файл обрано: ${selectedFile.name}` : "Фото профілю"}
                        </label>
                        <input
                          id="upload"
                          type="file"
                          accept="image/*"
                          style={{ display: "none" }}
                          onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                        />
                      </div> 
                    )}
                  </div>
                </div>
                {isAuthor && 
                  <div className={styles.uploadSection}>
                    <label htmlFor="upload-profile" className={selectedFile ? `${styles.inputUpload} ${styles.start}` : `${styles.inputUpload}`}>
                      {!selectedFile && 
                        <svg width="41" height="35" viewBox="0 0 41 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M31.9094 10.6845C30.5744 3.9276 23.9268 -0.800125 16.8736 0.819596L16.3788 0.943444C11.3217 2.33821 7.66092 7.00068 7.20239 12.3325L7.17635 12.7569C7.15824 13.1801 7.16615 13.606 7.20239 14.0713C3.10946 14.5114 -0.0117234 18.3069 0.569905 22.6878L0.625243 23.0429C1.26837 26.5589 6.33333 30.0906 13.8333 29.3334V27.5542C8.83333 28.3996 2.77003 25.4902 2.26424 22.7308L2.22192 22.4616C1.769 19.0484 4.19552 16.0944 7.37817 15.7523L8.99275 15.579L8.86417 13.9376C8.82246 13.402 8.82453 12.9464 8.86417 12.4795C9.27863 7.66044 12.6818 3.51415 17.2414 2.4676L17.8127 2.35201C23.7047 1.32249 29.154 5.34098 30.2753 11.0164L30.5243 12.278L31.7906 12.3705L32.1926 12.4101C36.1745 12.9082 39.1039 16.4068 38.8121 20.5131L38.773 20.9259C38.3095 24.7018 33 28.3996 27.1667 27.5542V29.2452C34.6667 30.0906 39.5852 26.0554 40.3616 21.5732L40.4267 21.1356C41.0917 15.7246 37.1527 11.0666 31.9094 10.6845Z" fill="#52869F"/>
                          <path d="M19.6653 18.7862L17.7561 20.7232C17.4311 21.0529 16.9027 21.0529 16.5777 20.7232C16.2528 20.3934 16.2527 19.8573 16.5777 19.5276L19.9111 16.1457C20.0192 16.0364 20.1507 15.9781 20.2887 15.941C20.3237 15.9308 20.3562 15.9246 20.3928 15.9195C20.5359 15.8994 20.6813 15.9068 20.816 15.9625C20.819 15.9642 20.8226 15.9675 20.8258 15.9691C20.919 16.0113 21.0096 16.0664 21.0878 16.1457L24.4212 19.5276C24.7476 19.8571 24.7471 20.3934 24.4228 20.7232C24.2595 20.8872 24.0453 20.9709 23.832 20.9709C23.6187 20.9708 23.4061 20.8888 23.2428 20.7232L21.332 18.7862L21.332 33.6545C21.3319 34.1212 20.9586 34.5 20.4986 34.5C20.0387 34.4999 19.6653 34.1212 19.6653 33.6545L19.6653 18.7862Z" fill="#52869F"/>
                        </svg>
                      }
                      {selectedFile ? `Файл обрано: ${selectedFile.name}` : "Фото профілю"}
                    </label>
                    <input
                      id="upload-profile"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    />
                  </div>
                }
                <button className={styles.btnUpload} onClick={handleEditUser} disabled={!isEditAllowed}>Зберегти</button>
              </div>
            </div>
          )}

          {isCreateAlbumModalOpen && (
            <div className={styles.modalOverlay} onClick={() => setIsCreateAlbumModalOpen(false)}>
              <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 className={styles.titleUpload}>Створення альбому</h3>
                <svg className={styles.crossBtn} onClick={() => setIsCreateAlbumModalOpen(false)} width="15" height="15" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.6781 9.55572L20.4562 0.777656L22.5775 2.89898L13.7995 11.677L22.5782 20.4558L20.4569 22.5771L11.6781 13.7984L2.89939 22.5771L0.778068 20.4558L9.55683 11.677L0.778758 2.89898L2.90008 0.777656L11.6781 9.55572Z" fill="#74BCC3"/>
                </svg>

                <div className={styles.inputsSection}>
                  <p className={styles.label}>Назва альбому</p>
                  <input
                    type="text"
                    placeholder="Назва альбому"
                    className={styles.inputName}
                    onChange={(e) => setSelectedAlbumName(e.target.value)}
                  />
                </div>

                <div className={styles.uploadSection}>
                  <label htmlFor="upload-album" className={selectedCover ? `${styles.inputUpload} ${styles.start}` : `${styles.inputUpload}`}>
                    {!selectedCover && 
                      <svg width="41" height="35" viewBox="0 0 41 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M31.9094 10.6845C30.5744 3.9276 23.9268 -0.800125 16.8736 0.819596L16.3788 0.943444C11.3217 2.33821 7.66092 7.00068 7.20239 12.3325L7.17635 12.7569C7.15824 13.1801 7.16615 13.606 7.20239 14.0713C3.10946 14.5114 -0.0117234 18.3069 0.569905 22.6878L0.625243 23.0429C1.26837 26.5589 6.33333 30.0906 13.8333 29.3334V27.5542C8.83333 28.3996 2.77003 25.4902 2.26424 22.7308L2.22192 22.4616C1.769 19.0484 4.19552 16.0944 7.37817 15.7523L8.99275 15.579L8.86417 13.9376C8.82246 13.402 8.82453 12.9464 8.86417 12.4795C9.27863 7.66044 12.6818 3.51415 17.2414 2.4676L17.8127 2.35201C23.7047 1.32249 29.154 5.34098 30.2753 11.0164L30.5243 12.278L31.7906 12.3705L32.1926 12.4101C36.1745 12.9082 39.1039 16.4068 38.8121 20.5131L38.773 20.9259C38.3095 24.7018 33 28.3996 27.1667 27.5542V29.2452C34.6667 30.0906 39.5852 26.0554 40.3616 21.5732L40.4267 21.1356C41.0917 15.7246 37.1527 11.0666 31.9094 10.6845Z" fill="#52869F"/>
                        <path d="M19.6653 18.7862L17.7561 20.7232C17.4311 21.0529 16.9027 21.0529 16.5777 20.7232C16.2528 20.3934 16.2527 19.8573 16.5777 19.5276L19.9111 16.1457C20.0192 16.0364 20.1507 15.9781 20.2887 15.941C20.3237 15.9308 20.3562 15.9246 20.3928 15.9195C20.5359 15.8994 20.6813 15.9068 20.816 15.9625C20.819 15.9642 20.8226 15.9675 20.8258 15.9691C20.919 16.0113 21.0096 16.0664 21.0878 16.1457L24.4212 19.5276C24.7476 19.8571 24.7471 20.3934 24.4228 20.7232C24.2595 20.8872 24.0453 20.9709 23.832 20.9709C23.6187 20.9708 23.4061 20.8888 23.2428 20.7232L21.332 18.7862L21.332 33.6545C21.3319 34.1212 20.9586 34.5 20.4986 34.5C20.0387 34.4999 19.6653 34.1212 19.6653 33.6545L19.6653 18.7862Z" fill="#52869F"/>
                      </svg>
                    }
                    {selectedCover ? `Файл обрано: ${selectedCover.name}` : "Обкладинка"}
                  </label>
                  <input
                    id="upload-album"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) => setSelectedCover(e.target.files?.[0] || null)}
                  />
                </div>

                <button className={styles.btnUpload} onClick={handleUploadAlbum}>Опублікувати</button>
              </div>
            </div>
          )}

          {isCreateTrackModalOpen && (
            <div className={styles.modalOverlay} onClick={() => setIsCreateTrackModalOpen(false)}>
              <div className={`${styles.modal} ${styles.smallModal}`} onClick={(e) => e.stopPropagation()}>
                <h3 className={styles.titleUpload}>Завантаження треку</h3>
                <svg className={styles.crossBtn} onClick={() => setIsCreateTrackModalOpen(false)} width="15" height="15" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M11.6781 9.55572L20.4562 0.777656L22.5775 2.89898L13.7995 11.677L22.5782 20.4558L20.4569 22.5771L11.6781 13.7984L2.89939 22.5771L0.778068 20.4558L9.55683 11.677L0.778758 2.89898L2.90008 0.777656L11.6781 9.55572Z" fill="#74BCC3"/>
                </svg>

                <div className={styles.inputsSection}>
                  <p className={styles.label}>Назва треку</p>
                  <input
                    type="text"
                    placeholder="Назва треку"
                    className={styles.inputName}
                    onChange={(e) => setSelectedTrackName(e.target.value)}
                  />
                  { albums ? 
                    <p className={styles.label}>Оберіть альбом</p>
                    : <p className={styles.label}>У вас немає створених альбомів</p>
                  }
                  { albums && 
                    <select
                      className={styles.genreSelect}
                      value={selectedAlbumId}
                      onChange={(e) => setSelectedAlbumId(e.target.value)}
                    >
                      <option value="">Оберіть альбом</option>
                      {albums.map((album, id) => (
                        <option key={id} value={album.id}>
                          {album.name}
                        </option>
                      ))}
                    </select>
                  }
                </div>

                <div className={styles.uploadSection}>
                  <label htmlFor="upload-track" className={selectedAudio ? `${styles.inputUpload} ${styles.start}` : `${styles.inputUpload}`}>
                    {!selectedAudio && 
                      <svg width="41" height="35" viewBox="0 0 41 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M31.9094 10.6845C30.5744 3.9276 23.9268 -0.800125 16.8736 0.819596L16.3788 0.943444C11.3217 2.33821 7.66092 7.00068 7.20239 12.3325L7.17635 12.7569C7.15824 13.1801 7.16615 13.606 7.20239 14.0713C3.10946 14.5114 -0.0117234 18.3069 0.569905 22.6878L0.625243 23.0429C1.26837 26.5589 6.33333 30.0906 13.8333 29.3334V27.5542C8.83333 28.3996 2.77003 25.4902 2.26424 22.7308L2.22192 22.4616C1.769 19.0484 4.19552 16.0944 7.37817 15.7523L8.99275 15.579L8.86417 13.9376C8.82246 13.402 8.82453 12.9464 8.86417 12.4795C9.27863 7.66044 12.6818 3.51415 17.2414 2.4676L17.8127 2.35201C23.7047 1.32249 29.154 5.34098 30.2753 11.0164L30.5243 12.278L31.7906 12.3705L32.1926 12.4101C36.1745 12.9082 39.1039 16.4068 38.8121 20.5131L38.773 20.9259C38.3095 24.7018 33 28.3996 27.1667 27.5542V29.2452C34.6667 30.0906 39.5852 26.0554 40.3616 21.5732L40.4267 21.1356C41.0917 15.7246 37.1527 11.0666 31.9094 10.6845Z" fill="#52869F"/>
                        <path d="M19.6653 18.7862L17.7561 20.7232C17.4311 21.0529 16.9027 21.0529 16.5777 20.7232C16.2528 20.3934 16.2527 19.8573 16.5777 19.5276L19.9111 16.1457C20.0192 16.0364 20.1507 15.9781 20.2887 15.941C20.3237 15.9308 20.3562 15.9246 20.3928 15.9195C20.5359 15.8994 20.6813 15.9068 20.816 15.9625C20.819 15.9642 20.8226 15.9675 20.8258 15.9691C20.919 16.0113 21.0096 16.0664 21.0878 16.1457L24.4212 19.5276C24.7476 19.8571 24.7471 20.3934 24.4228 20.7232C24.2595 20.8872 24.0453 20.9709 23.832 20.9709C23.6187 20.9708 23.4061 20.8888 23.2428 20.7232L21.332 18.7862L21.332 33.6545C21.3319 34.1212 20.9586 34.5 20.4986 34.5C20.0387 34.4999 19.6653 34.1212 19.6653 33.6545L19.6653 18.7862Z" fill="#52869F"/>
                      </svg>
                    }
                    {selectedAudio ? `Файл обрано: ${selectedAudio.name}` : "Аудіофайл"}
                  </label>
                  <input
                    id="upload-track"
                    type="file"
                    accept="audio/*"
                    style={{ display: "none" }}
                    onChange={(e) => setSelectedAudio(e.target.files?.[0] || null)}
                  />
                </div>

                <div className={styles.selectSection}>
                  <select
                    className={styles.genreSelect}
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                  >
                    <option value="">Оберіть жанр</option>
                    {genres.map((genre, id) => (
                      <option key={id} value={genreNames[id]}>
                        {genre.label}
                      </option>
                    ))}
                  </select>
                  <select
                    className={styles.moodSelect}
                    value={selectedMood}
                    onChange={(e) => setSelectedMood(e.target.value)}
                  >
                    <option value="">Оберіть настрій</option>
                    {moods.map((mood, id) => (
                      <option key={id} value={moodNames[id]}>
                        {mood.label}
                      </option>
                    ))}
                  </select>
                </div>

                <button className={styles.btnUpload} onClick={handleUploadTrack}>Опублікувати</button>
              </div>
            </div>
          )}

          <div className={styles.nameSection}>
            <h2>{user?.username || "Нікнейм"}</h2>
            <div className={styles.statisctics}>
              <div className={styles.value}>
                <p>{followings}</p>
                <p>Підписки</p>
              </div>
              {isAuthor && 
                <div className={styles.value}>
                  <p>{musicAmount}</p>
                  <p>Музика</p>
                </div>
              }
              <div className={styles.value}>
                <p>{subscribers}</p>
                <p>Слухачі</p>
              </div>
            </div>
          </div>
          { isAuthor && 
            <div className={styles.textSection}>
              <p>{bio}</p>
            </div> 
          }
        </div>
      </div>

      <div className={styles.profileContent}>
        {isAuthor && 
          <div className={styles.createContentBlock}>
            <button className={styles.btnAlbumCreate} onClick={()=>{setIsCreateAlbumModalOpen(true)}}>Створити альбом</button>
            <button className={styles.btnTrackCreate} onClick={()=>{setIsCreateTrackModalOpen(true)}}>Завантажити трек</button>
          </div>
        }
        { allTracks && <TrackCards songs={allTracks} title="Ваші треки"/>}
        { albums && <AlbumCards albums={albums} title="Ваші створені альбоми"/> }
        { favorites && <TrackCards songs={favorites} title="Вам до вподоби"/>}
      </div>
    </div>
  );
}

export default Profile;