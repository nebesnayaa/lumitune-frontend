import React, { useEffect, useRef, useState } from "react";
import { useDragScroll } from "../../hooks/useDragScroll";

import happyImg from "/images/mood/happy.svg";
import sadImg from "/images/mood/sad.svg";
import romImg from "/images/mood/romantic.svg";
import driveImg from "/images/mood/drive.svg";
import partyImg from "/images/mood/party.svg";
import chillImg from "/images/mood/chill.svg";
import fanImg from "/images/mood/fan.svg";

import fireImg from "/images/genres/fire.svg";
import musicImg from "/images/genres/music.svg";
import popImg from "/images/genres/spring.svg";
import rockImg from "/images/genres/rocknroll.svg";
import metalIMg from "/images/genres/party.svg";
import rapIMg from "/images/genres/street.svg";
import clasIMg from "/images/genres/classic.svg";

import styles from "../../styles/home/MoodSelector.module.css";
import { getGenres, getMoods } from "../../api/contentService";
import { useNavigate } from "react-router";

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
  const [ moodNames, setMoodNames ] = useState<string[]>([]);
  const [ genreNames, setGenreNames ] = useState<string[]>([]);

  const [selected, setSelected] = useState<"mood" | "genre">("mood");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLSpanElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  useDragScroll(sliderRef);
  const navigate = useNavigate()
  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleSelect = (option: "mood" | "genre", event: React.MouseEvent) => {
    event.stopPropagation();
    setSelected(option);
    setShowDropdown(false);
  };

  useEffect(() => {   // Закрити меню, якщо клік поза ним
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

  useEffect(()=> {
    const fetchgenres = async() => {
      const moods = await getMoods();
      const genres = await getGenres();
      // if(!moods || !genres) return;
      setMoodNames(moods);
      setGenreNames(genres);
    }
    fetchgenres();
  }, [])

  const onMoodClick = (name: string) => {
    navigate(`mood/${name}`, { state: { type: "mood" } });
  }

  const onGenreClick = (name: string) => {
    navigate(`mood/${name}`, { state: { type: "genre" } });
  }

  return(
    <div className={styles.container}>
      <div>
        <h2 className={styles.title}>
          Саундтреки на основі 
          <span>{selected ==="mood" ? " твого" : ""}</span>
          <span className={styles.mood} onClick={toggleDropdown} ref={toggleRef}>
            {selected === "mood" ? "настрою" : "жанру"}
            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.5L7 7.5L13 1.5" stroke="#40A2FF" strokeWidth="2"/>
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
              <div key={index} className={styles.emotion} onClick={()=>onMoodClick(moodNames[index])}>   
                <img src={mood.img} alt={mood.label} draggable={false}/>
                <p>{mood.label}</p>
              </div>
            ))) :
            (genres.map((genre, index) => ( 
              <div key={index} className={styles.emotion} onClick={()=>onGenreClick(genreNames[index])}>
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
