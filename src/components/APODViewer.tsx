import { useEffect, useState } from 'react';
import type { APOD } from '../types/api';

export default function APODViewer() {
  const [apod, setApod] = useState<APOD | null>(null);
  const key = import.meta.env.VITE_NASA_API_KEY || 'DEMO_KEY';

  async function load(date?: string){
    const url = new URL('https://api.nasa.gov/planetary/apod');
    url.searchParams.set('api_key', key);
    if (date) url.searchParams.set('date', date);
    const r = await fetch(url.toString()); const j = await r.json(); setApod(j);
  }

  useEffect(() => { load(); }, []);

  const randomDate = () => {
    const start = new Date(1995, 5, 16).getTime();
    const end = Date.now();
    const d = new Date(start + Math.random()*(end-start));
    return d.toISOString().slice(0,10);
  };

  return (
    <section id="apod" className="section">
      <div className="container">
        <h2 className="reveal">Astronomy Picture of the Day</h2>
        {!apod ? <div style={{padding:24}}>Loading…</div> : (
          <div className="grid grid--2" style={{alignItems:'center', marginTop:16}}>
            <div>
              <div className="muted" style={{marginBottom:12}}>{apod.date}</div>
              <h3 style={{margin:'8px 0 12px 0'}}>{apod.title}</h3>
              <p className="muted" style={{lineHeight:1.6}}>{apod.explanation}</p>
              <div style={{marginTop:16, display:'flex', gap:12}}>
                <button className="btn btn--accent" onClick={() => load(randomDate())}>Random Day</button>
                <a className="btn" href={apod.hdurl || apod.url} target="_blank" rel="noreferrer">Open Original</a>
              </div>
            </div>
            <div className="panel soft-glow" style={{overflow:'hidden'}}>
              {apod.media_type === 'image'
                ? <img src={apod.hdurl || apod.url} alt={apod.title} loading="lazy" />
                : <iframe src={apod.url} allowFullScreen style={{width:'100%', aspectRatio:'16/9', border:0}} />
              }
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
