import React, { useEffect, useRef, useState } from "react";
import { useDragScroll } from "../../hooks/useDragScroll";
import styles from "../../styles/home/MoodSelector.module.css";

import happyImg from "../../assets/mood/happy.svg";
import sadImg from "../../assets/mood/sad.svg";
import romImg from "../../assets/mood/romantic.svg";
import driveImg from "../../assets/mood/drive.svg";
import partyImg from "../../assets/mood/party.svg";
import chillImg from "../../assets/mood/chill.svg";
import fanImg from "../../assets/mood/fan.svg";

import fireImg from "../../assets/genres/fire.svg";
import musicImg from "../../assets/genres/music.svg";
import popImg from "../../assets/genres/spring.svg";
import rockImg from "../../assets/genres/rocknroll.svg";
import metalIMg from "../../assets/genres/party.svg";
import rapIMg from "../../assets/genres/street.svg";
import clasIMg from "../../assets/genres/classic.svg";

const MoodSelector: React.FC = () => {
  const moods = [
    { label: "Хеппі", img: happyImg },
    { label: "Меланхолія", img: sadImg },
    { label: "Романтика", img: romImg },
    { label: "Драйв", img: driveImg },
    { label: "Туса", img: partyImg },
    { label: "Чілл", img: chillImg },
    { label: "Фан", img: fanImg },
  ];

  const genres = [
    { label: "Новинки", img: fireImg },
    { label: "Поп", img: musicImg },
    { label: "K-pop", img: popImg },
    { label: "Рок", img: rockImg },
    { label: "Метал", img: metalIMg },
    { label: "Реп", img: rapIMg },
    { label: "Класика", img: clasIMg },
  ];

  const [selected, setSelected] = useState<"mood" | "genre">("mood");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLSpanElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  useDragScroll(sliderRef);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleSelect = (option: "mood" | "genre", event: React.MouseEvent) => {
    event.stopPropagation();
    setSelected(option);
    setShowDropdown(false);
  };

  // Закрити меню, якщо клік поза ним
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        toggleRef.current &&
        !toggleRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return(
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>
          Саундтреки на основі твого
          <span className={styles.mood} onClick={toggleDropdown} ref={toggleRef}>
            {selected === "mood" ? "настрою" : "жанру"}
            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.5L7 7.5L13 1.5" stroke="#40A2FF" stroke-width="2"/>
            </svg>
            {showDropdown && (
              <div className={styles.dropdown} ref={dropdownRef}>
                <div
                  className={`${styles.option} ${selected === "mood" ? styles.active : ""}`}
                  onClick={(e) => handleSelect("mood", e)}
                >
                  Настрій
                </div>
                <div
                  className={`${styles.option} ${selected === "genre" ? styles.active : ""}`}
                  onClick={(e) => handleSelect("genre", e)}
                >
                  Жанри
                </div>
              </div>
            )}
          </span>
        </h2>

        {/* Строка настроїв */}
        <div className={styles.slider} ref={sliderRef}>
          {selected === "mood" ? 
            (moods.map((mood, index) => (
              <div key={index} className={styles.emotion}>
                <img src={mood.img} alt={mood.label} draggable={false}/>
                <p>{mood.label}</p>
              </div>
            ))) :
            (genres.map((genre, index) => (
              <div key={index} className={styles.emotion}>
                <img src={genre.img} alt={genre.label} draggable={false}/>
                <p>{genre.label}</p>
              </div>
            )))
          }
        </div>
      </div>
    </div>
  );
}
export default MoodSelector;
