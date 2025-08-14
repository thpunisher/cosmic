import { motion, useScroll, useTransform } from 'framer-motion';
import { useState } from 'react';

export default function Navbar() {
  const { scrollY } = useScroll();
  const bg = useTransform(scrollY, [0, 200], [0.0, 0.7]);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      className="navbar"
      style={{ backgroundColor: `rgba(10, 14, 26, ${bg.get()})` }}
    >
      <div className="navbar__inner">
        <a href="#" className="navbar__brand">COSMIC</a>

        {/* Hamburger Button (visible on small screens) */}
        <button
          className="navbar__toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? '✖' : '☰'}
        </button>

        {/* Desktop & Mobile Menu */}
        <div className={`navbar__links ${menuOpen ? 'navbar__links--open' : ''}`}>
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
