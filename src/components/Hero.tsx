import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Starfield from "./Starfield";

const headlines = [
  "Explore the Cosmos",
  "Track the ISS",
  "Discover NASA Missions",
  "Witness Astronomical Events",
];

export default function Hero() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);

  // Typing effect
  useEffect(() => {
    if (index < headlines.length) {
      if (subIndex <= headlines[index].length) {
        const timeout = setTimeout(() => {
          setText(headlines[index].substring(0, subIndex));
          setSubIndex(subIndex + 1);
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setSubIndex(0);
          setIndex((index + 1) % headlines.length);
        }, 2000);
        return () => clearTimeout(timeout);
      }
    }
  }, [subIndex, index]);

  // Cursor blink
  useEffect(() => {
    const timeout = setInterval(() => setBlink((prev) => !prev), 500);
    return () => clearInterval(timeout);
  }, []);

  return (
    <section className="hero">
      <Starfield />
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="hero-title">
          {text}
          <span className="cursor">{blink ? "|" : " "}</span>
        </h1>
        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <button className="btn">Explore News</button>
          <button className="btn-outline">Track ISS</button>
        </motion.div>
      </motion.div>
    </section>
  );
}
