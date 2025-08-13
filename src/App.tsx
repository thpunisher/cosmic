import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ISSGlobe from './components/ISSGlobe';
import NewsFeed from './components/NewsFeed';
import APODViewer from './components/APODViewer';
import MarsRoverGallery from './components/MarsRoverGallery';
import Astronauts from './components/Astronauts';
import SpaceWeather from './components/SpaceWeather';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar/>
      <Hero />
      <ISSGlobe />
      <NewsFeed />
      <APODViewer />
      <MarsRoverGallery />
      <Astronauts />
      <SpaceWeather />
      <Footer />
    </>
  );
}
