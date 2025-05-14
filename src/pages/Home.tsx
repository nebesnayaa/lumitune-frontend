import React from "react";
import Carousel from "../components/home/Carousel";
import MoodSelector from "../components/home/MoodSelector";

const Home: React.FC = () => {
    return (
      <div>
        <Carousel />
        <MoodSelector />
        <MoodSelector />
        <MoodSelector />
      </div>
    );
  }
  
  export default Home;