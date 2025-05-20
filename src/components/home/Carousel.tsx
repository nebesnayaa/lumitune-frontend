import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/home/Carousel.module.css";
import poster1 from "../../assets/carousel/poster1.svg";
import poster2 from "../../assets/carousel/poster2.svg";
import poster3 from "../../assets/carousel/poster3.svg";

const posters = [poster1, poster2, poster3];

const Carousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % posters.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      (prevIndex - 1 + posters.length) % posters.length
    );
  };

  // Автоперемикання кожні 10 секунд
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % posters.length);
    }, 10000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);
  
  return (
    <div className={styles.container}>
      <div className={styles.carouselWrapper}>
        <button className={`${styles.arrow} ${styles.left}`} onClick={handlePrev}>←</button>
        <button className={`${styles.arrow} ${styles.right}`} onClick={handleNext}>→</button>
        
        <div className={styles.carousel}>
          {posters.map((poster, index) => {
            const position =
              index === activeIndex
                ? styles.active
                : index === (activeIndex + 1) % posters.length
                ? styles.next
                : index === (activeIndex - 1 + posters.length) % posters.length
                ? styles.prev
                : styles.hidden;

            return (
              <img
                key={index}
                src={poster}
                alt={`Poster ${index + 1}`}
                className={`${styles.poster} ${position}`}
                draggable={false}
              />
            );
          })}
        </div>

        <div className={styles.dots}>
          {posters.map((_, idx) => (
            <span
              key={idx}
              className={`${styles.dot} ${
                idx === activeIndex ? styles.activeDot : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;