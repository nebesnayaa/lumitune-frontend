import React, { useEffect, useRef, useState } from "react";
import { CarouselItem } from "../../types/HomeContentData";

import styles from "../../styles/home/Carousel.module.css";

interface CarouselProps {
  images: CarouselItem[];
}

const Carousel:  React.FC<CarouselProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<number | null>(null);
  
  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  };

  // Автоперемикання кожні 10 секунд
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
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
          {images.map((poster, index) => {
            const position =
              index === activeIndex
                ? styles.active
                : index === (activeIndex + 1) % images.length
                ? styles.next
                : index === (activeIndex - 1 + images.length) % images.length
                ? styles.prev
                : styles.hidden;
            const imageUrl = Object.values(poster)[0];
            return (
              <img
                key={index}
                src={imageUrl}
                alt={`Poster ${index + 1}`}
                className={`${styles.poster} ${position}`}
                draggable={false}
              />
            );
          })}
        </div>

        <div className={styles.dots}>
          {images.map((_, idx) => (
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