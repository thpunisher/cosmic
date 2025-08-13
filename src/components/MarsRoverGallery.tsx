import { useEffect, useState } from 'react';
import type { RoverPhoto } from '../types/api';

const rovers = ['Curiosity','Opportunity','Spirit','Perseverance'] as const;
const cameras = ['FHAZ','RHAZ','MAST','CHEMCAM','NAVCAM','PANCAM','MINITES'];

export default function MarsRoverGallery() {
  const key = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';
  const [rover, setRover] = useState<typeof rovers[number]>('Perseverance');
  const [date, setDate] = useState<string>('2021-02-19'); // near landing
  const [camera, setCamera] = useState<string>('');
  const [photos, setPhotos] = useState<RoverPhoto[]>([]);
  const [loading, setLoading] = useState(false);

  async function load(){
    setLoading(true);
    const url = new URL(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover.toLowerCase()}/photos`);
    url.searchParams.set('earth_date', date);
    if (camera) url.searchParams.set('camera', camera);
    url.searchParams.set('api_key', key);
    const r = await fetch(url.toString()); const j = await r.json();
    setPhotos(j.photos ?? []); setLoading(false);
  }

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [rover, date, camera]);

  return (
    <section id="rover" className="section">
      <div className="container">
        <h2 className="reveal">Mars Rover Photos</h2>
        <div className="panel" style={{padding:16, margin:'16px 0'}}>
          <div style={{display:'flex', gap:12, flexWrap:'wrap', alignItems:'center'}}>
            <label>Rover:
              <select value={rover} onChange={e=>setRover(e.target.value as any)} style={{marginLeft:8}}>
                {rovers.map(r => <option key={r}>{r}</option>)}
              </select>
            </label>
            <label>Date:
              <input type="date" value={date} onChange={e=>setDate(e.target.value)} style={{marginLeft:8}} />
            </label>
            <label>Camera:
              <select value={camera} onChange={e=>setCamera(e.target.value)} style={{marginLeft:8}}>
                <option value="">Any</option>
                {cameras.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <button className="btn" onClick={load}>Reload</button>
          </div>
        </div>
        {loading ? <div style={{padding:24}}>Loading…</div> : (
          photos.length === 0 ? <div className="muted">No photos for this selection.</div> :
          <div className="grid grid--3">
            {photos.map(p => (
              <a key={p.id} href={p.img_src} target="_blank" rel="noreferrer" className="card reveal" style={{animationDelay:'.05s'}}>
                <img src={p.img_src} alt="Mars" className="card__media" loading="lazy" />
                <div className="card__body">
                  <div className="card__meta">{p.rover.name} • {p.camera.full_name}</div>
                  <div className="card__title">Earth Date: {p.earth_date}</div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
