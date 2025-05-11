import Carousel from "../components/home/Carousel";
import MoodSelector from "../components/home/MoodSelector";

function Home() {
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