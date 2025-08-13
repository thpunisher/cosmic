import { motion, useScroll, useTransform } from 'framer-motion';

export default function Navbar() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 200], [0.0, 0.7]);
  return (
    <motion.nav className="navbar" style={{ backgroundColor: `rgba(10, 14, 26, ${bg.get()})` }}>
      <div className="navbar__inner">
        <a href="#" className="navbar__brand">COSMIC</a>
        <div className="navbar__links">
          <a className="navbar__link" href="#iss">ISS</a>
          <a className="navbar__link" href="#news">News</a>
          <a className="navbar__link" href="#apod">APOD</a>
          <a className="navbar__link" href="#rover">Mars Rover</a>
          <a className="navbar__link" href="#astronauts">Astronauts</a>
          <a className="navbar__link" href="#spacewx">Space Weather</a>
        </div>
      </div>
    </motion.nav>
  );
}
