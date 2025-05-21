import React from "react";
import Carousel from "../components/home/Carousel";
import MoodSelector from "../components/home/MoodSelector";
import TopMusic from "../components/home/TopMusic";
import NewReleases from "../components/home/NewReleases";

import styles from "../styles/App.module.css";

const Home: React.FC = () => {
    return (
      <div>
        <Carousel/>
        <div className={styles.home}>
          <MoodSelector/>
          <TopMusic/>
          <NewReleases/>
        </div>
      </div>
    );
  }
  
  export default Home;