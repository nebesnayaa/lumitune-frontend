import React, { useEffect, useState } from "react";
import Carousel from "../components/home/Carousel";
import MoodSelector from "../components/home/MoodSelector";
import TrackCards from "../components/contentCards/TrackCards";
import AlbumCards from "../components/contentCards/AlbumCards";

import { CarouselItem, HomeContentResponse } from "../types/HomeContentData";
import { getContentHome } from "../api/contentService";

import poster1 from "/images/carousel/poster1.svg";
import poster2 from "/images/carousel/poster2.svg";
import poster3 from "/images/carousel/poster3.svg";

import styles from "../styles/App.module.css";

const fallbackImages: CarouselItem[] = [
  { img: poster1 },
  { img: poster2 },
  { img: poster3 },
];

const Home: React.FC = () => {
  const [content, setContent] = useState<HomeContentResponse | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      const data = await getContentHome();
      if (data) {
        setContent(data);
      }
    };

    fetchContent();
  }, []);

  return (
    <div>
      <Carousel images={content?.carousel || fallbackImages}/>
      <div className={styles.home}>
        <MoodSelector/>
        {content && <TrackCards songs={content.recommendations} />}
        {content && <AlbumCards albums={content.newReleases}/>}
      </div>
    </div>
  );
}

export default Home;