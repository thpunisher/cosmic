import { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";

type ISSData = {
  latitude: number;
  longitude: number;
};

export default function ISSGlobe() {
  const [iss, setIss] = useState<ISSData>({ latitude: 0, longitude: 0 });
  const [nextPass, setNextPass] = useState<string>("Loading...");

  const fetchISS = async () => {
    try {
      const res = await fetch(
        "https://api.allorigins.win/raw?url=http://api.open-notify.org/iss-now.json"
      );
      const data = await res.json();
      setIss({
        latitude: parseFloat(data.iss_position.latitude),
        longitude: parseFloat(data.iss_position.longitude),
      });
    } catch (err) {
      console.error("Failed to fetch ISS data", err);
    }
  };

  const fetchNextPass = async () => {
    try {
      if (!navigator.geolocation) return;
      navigator.geolocation.getCurrentPosition(async (pos) => {
        const res = await fetch(
          `https://api.allorigins.win/raw?url=http://api.open-notify.org/iss-pass.json?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`
        );
        const data = await res.json();
        const riseTime = new Date(data.response[0].risetime * 1000);
        setNextPass(riseTime.toLocaleTimeString());
      });
    } catch (err) {
      console.error("Failed to fetch next pass", err);
    }
  };

  useEffect(() => {
    fetchISS();
    fetchNextPass();
    const interval = setInterval(fetchISS, 5000);
    return () => clearInterval(interval);
  }, []);

  const Globe = () => {
    const meshRef = useRef<any>(null);

    useFrame(() => {
      if (meshRef.current) meshRef.current.rotation.y += 0.001;
    });

    // Convert lat/lon to XYZ on sphere
    const latLonToXYZ = (lat: number, lon: number, radius: number) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      const x = -radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.cos(phi);
      const z = radius * Math.sin(phi) * Math.sin(theta);
      return [x, y, z];
    };

    const issPos = latLonToXYZ(iss.latitude, iss.longitude, 2.05);

    return (
      <group ref={meshRef}>
        {/* Earth */}
        <mesh>
          <sphereGeometry args={[2, 64, 64]} />
          <meshStandardMaterial
            color="#0f0f0f"
            roughness={1}
            metalness={0.1}
            wireframe={false}
          />
        </mesh>

        {/* Stars */}
        <Stars radius={100} depth={50} count={5000} factor={4} fade />

        {/* ISS */}
        <mesh position={issPos}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshStandardMaterial color="#ff0000" />
        </mesh>

        {/* Orbital trail */}
        <mesh>
          <torusGeometry args={[2.05, 0.002, 16, 100]} />
          <meshBasicMaterial color="#00ffff" transparent opacity={0.3} />
        </mesh>
      </group>
    );
  };

  return (
    <section className="iss-section">
      <h2 className="section-title">Live ISS Tracker</h2>
      <p>Next pass over your location: {nextPass}</p>
      <div className="globe-container">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Globe />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            rotateSpeed={0.5}
            minDistance={3}
            maxDistance={10}
          />
        </Canvas>
      </div>
    </section>
  );
}
