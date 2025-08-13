import { useEffect, useMemo, useState } from 'react';

/**
 * NOAA SWPC public JSON (HTTPS)
 * - Planetary K-index (geomagnetic activity): 1-minute values
 * - Aurora forecast (Ovation) polygons (optional; heavy)
 */
type KRow = { time_tag: string; kp_index: number };

export default function SpaceWeather() {
  const [kp, setKp] = useState<KRow[]>([]);

  useEffect(() => {
    fetch('https://services.swpc.noaa.gov/json/planetary_k_index_1m.json')
      .then(r=>r.json()).then(setKp).catch(()=>setKp([]));
  }, []);

  const latest = kp.length ? kp[kp.length-1] : null;
  const series = useMemo(() => kp.slice(-180), [kp]); // ~last 3h

  return (
    <section id="spacewx" className="section">
      <div className="container">
        <h2 className="reveal">Space Weather</h2>
        <p className="muted" style={{marginBottom:12}}>
          Planetary K-index (geomagnetic storm scale 0–9). Higher = stronger auroras & disturbances.
        </p>

        {latest && (
          <div className="panel" style={{padding:16, marginBottom:16}}>
            <strong>Latest Kp:</strong> <span style={{color:'var(--accent)', fontWeight:600}}>{latest.kp_index}</span>
            <span className="muted" style={{marginLeft:8}}>at {new Date(latest.time_tag).toLocaleString()}</span>
          </div>
        )}

        <div className="panel" style={{padding:16}}>
          <div style={{width:'100%', height:220}}>
            <svg viewBox="0 0 600 200" width="100%" height="100%" preserveAspectRatio="none">
              <polyline
                fill="none"
                stroke="url(#g)"
                strokeWidth="2"
                points={series.map((d, i) => {
                  const x = (i / Math.max(1, series.length-1)) * 580 + 10;
                  const y = 190 - (Math.min(9, d.kp_index) / 9) * 170;
                  return `${x},${y}`;
                }).join(' ')}
              />
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#33c2ff"/>
                  <stop offset="100%" stopColor="#8a7cff"/>
                </linearGradient>
              </defs>
              <line x1="10" y1="190" x2="590" y2="190" stroke="rgba(255,255,255,.15)" />
              {Array.from({length:10}).map((_,i)=>(
                <g key={i}>
                  <line x1="10" x2="590" y1={190 - (i/9)*170} y2={190 - (i/9)*170} stroke="rgba(255,255,255,.06)"/>
                  <text x="2" y={194 - (i/9)*170} fontSize="10" fill="rgba(255,255,255,.6)">{i}</text>
                </g>
              ))}
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
