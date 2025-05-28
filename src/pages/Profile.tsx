import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { getCurrentUser, editUser } from "../api/userService";
import WeekLikes from "../components/profile/WeekLikes";
import MonthTop from "../components/profile/MonthTop";
import defaultAvatar from "/images/defaultAvatar.png";
import styles from "../styles/profile/Profile.module.css";
import { uploadImage } from "../api/contentService";
import { User } from "../types/UserData";

const Profile: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const [subscribers, setSubscribers] = useState<number>(0);
  const [followings, setFollowings] = useState<number>(0);
  
  useEffect(() => {
    if (user) {
      getCurrentUser()
        .then((data) => {
          setAvatarUrl(data.avatar.url || null);
          setSubscribers(data.accSubscribers || 0);
          setFollowings(data.accFollowings || 0);
        })
        .catch((err) => {
          console.error("Не вдалося отримати дані користувача:", err);
        });
    }
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const uploadedImage  = await uploadImage(formData);
      if (!uploadedImage) throw new Error("Не вдалося завантажити зображення");

      const currentUser = await getCurrentUser();

      const updatedUser: User = {
        ...currentUser,
        avatar: uploadedImage,
      };

      await editUser(updatedUser);
      await refreshUser();
      setAvatarUrl(uploadedImage.url);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Помилка завантаження аватарки:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.profileBlock}>
        <div className={styles.settings}>
          <p className={styles.title}>Профіль</p>
          <svg onClick={() => navigate("/settings")} width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.09375 0.75C7.88664 0.75 7.71875 0.917893 7.71875 1.125V2.58072C7.71875 2.76389 7.5861 2.91902 7.40726 2.95859C6.6934 3.11655 6.02588 3.3978 5.42818 3.77886C5.27379 3.87729 5.0704 3.86133 4.94092 3.73186L3.91144 2.70237C3.76499 2.55593 3.52756 2.55593 3.38111 2.70237L2.45303 3.63045C2.30658 3.7769 2.30658 4.01433 2.45303 4.16078L3.48237 5.19012C3.61186 5.31961 3.62781 5.52303 3.52934 5.67743C3.14803 6.27532 2.86661 6.9431 2.70859 7.65726C2.66902 7.8361 2.51389 7.96875 2.33072 7.96875H0.875C0.667893 7.96875 0.5 8.13664 0.5 8.34375V9.65625C0.5 9.86336 0.667893 10.0312 0.875 10.0312H2.33072C2.51389 10.0312 2.66902 10.1639 2.70859 10.3427C2.86661 11.0569 3.14803 11.7247 3.52934 12.3226C3.62781 12.477 3.61186 12.6804 3.48237 12.8099L2.4528 13.8395C2.30635 13.9859 2.30635 14.2233 2.4528 14.3698L3.38088 15.2979C3.52732 15.4443 3.76476 15.4443 3.91121 15.2979L4.94092 14.2681C5.0704 14.1387 5.27379 14.1227 5.42818 14.2211C6.02588 14.6022 6.6934 14.8835 7.40726 15.0414C7.5861 15.081 7.71875 15.2361 7.71875 15.4193V16.875C7.71875 17.0821 7.88664 17.25 8.09375 17.25H9.40625C9.61336 17.25 9.78125 17.0821 9.78125 16.875V15.4193C9.78125 15.2361 9.9139 15.081 10.0927 15.0414C10.8067 14.8834 11.4743 14.6021 12.072 14.221C12.2264 14.1226 12.4298 14.1385 12.5593 14.268L13.589 15.2977C13.7354 15.4442 13.9728 15.4442 14.1193 15.2977L15.0474 14.3696C15.1938 14.2232 15.1938 13.9857 15.0474 13.8393L14.0178 12.8097C13.8883 12.6802 13.8723 12.4768 13.9708 12.3224C14.352 11.7246 14.6334 11.0568 14.7914 10.3427C14.831 10.1639 14.9861 10.0312 15.1693 10.0312H16.625C16.8321 10.0312 17 9.86336 17 9.65625V8.34375C17 8.13664 16.8321 7.96875 16.625 7.96875H15.1693C14.9861 7.96875 14.831 7.8361 14.7914 7.65726C14.6334 6.94317 14.352 6.27545 13.9708 5.6776C13.8723 5.52321 13.8883 5.31979 14.0177 5.19031L15.0471 4.16094C15.1936 4.01449 15.1936 3.77705 15.0471 3.63061L14.119 2.70253C13.9726 2.55608 13.7352 2.55608 13.5887 2.70253L12.5593 3.73198C12.4298 3.86145 12.2264 3.87741 12.072 3.77897C11.4743 3.39785 10.8067 3.11656 10.0927 2.95859C9.9139 2.91902 9.78125 2.76389 9.78125 2.58072V1.125C9.78125 0.917893 9.61336 0.75 9.40625 0.75H8.09375ZM8.75 13.125C11.0282 13.125 12.875 11.2782 12.875 9C12.875 6.72183 11.0282 4.875 8.75 4.875C6.47183 4.875 4.625 6.72183 4.625 9C4.625 11.2782 6.47183 13.125 8.75 13.125Z" fill="white"/>
          </svg>
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.avatarSection} onClick={() => setIsModalOpen(true)}>
            <img
              src={avatarUrl || defaultAvatar}
              alt=""
              className={styles.avatar}
              draggable="false"
            />
            
          </div>
          {isModalOpen && (
            <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
              <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3 className={styles.titleUpload}>Завантажити нову аватарку</h3>
                <label htmlFor="upload" className={styles.inputUpload}>
                  {selectedFile ? `Файл обрано: ${selectedFile.name}` : "Обрати зображення"}
                </label>
                <input
                  id="upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                />
                <button className={styles.btnUpload} onClick={handleUpload}>Завантажити</button>
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
              <div className={styles.value}>
                <p>6</p>
                <p>Музика</p>
              </div>
              <div className={styles.value}>
                <p>{subscribers}</p>
                <p>Слухачі</p>
              </div>
            </div>
          </div>
          <div className={styles.textSection}>
            <p>Вітаю всіх! Дякую, що завітали на мою сторінку. Тут ви знайдете мою музику, емоції та натхнення. Слухайте, відчувайте та поділіться враженнями! 🚀</p>
          </div>
        </div>
      </div>
      <WeekLikes/>
      <MonthTop/>
    </div>
  );
}

export default Profile;