import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ASTROS_API } from "../constants";
import "../styles/Astronauts.css";

interface Astronaut {
  name: string;
  craft: string;
}

interface AstroResponse {
  people: Astronaut[];
  number: number;
  message: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const Astronauts: React.FC = () => {
  const [astronauts, setAstronauts] = useState<Astronaut[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Detect if we're in local dev or production
  

  useEffect(() => {
    const fetchAstronauts = async () => {
      try {
        const res = await fetch(ASTROS_API);
        if (!res.ok) throw new Error("Failed to fetch astronauts");
        const data: AstroResponse = await res.json();
        setAstronauts(data.people);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAstronauts();
  }, [ASTROS_API]);

  if (loading)
    return <p style={{ color: "white", textAlign: "center" }}>Loading astronauts...</p>;
  if (error)
    return <p style={{ color: "red", textAlign: "center" }}>Error: {error}</p>;

  return (
    <motion.section
      className="astronaut-section"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      id="astronauts"
    >
      <h2>Astronauts in Space</h2>
      <motion.ul className="astronaut-list" variants={containerVariants}>
        {astronauts.map((astro, idx) => (
          <motion.li
            key={idx}
            className="astronaut-card"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
          >
            <strong>{astro.name}</strong> — {astro.craft}
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
};

export default Astronauts;
