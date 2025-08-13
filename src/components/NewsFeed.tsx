import { useEffect, useState } from 'react';
import type { SpaceflightArticle } from '../types/api';

export default function NewsFeed() {
  const [items, setItems] = useState<SpaceflightArticle[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setMore] = useState(true);

  async function load(p = 1){
    const r = await fetch(`https://api.spaceflightnewsapi.net/v4/articles/?limit=12&offset=${(p-1)*12}`);
    const j = await r.json();
    if (p === 1) setItems(j.results ?? []);
    else setItems(prev => [...prev, ...(j.results ?? [])]);
    setMore(Boolean(j.next));
  }

  useEffect(() => { load(1); }, []);

  return (
    <section id="news" className="section">
      <div className="container">
        <h2 className="reveal">Latest Space News</h2>
        <div className="grid grid--3" style={{marginTop:16}}>
          {items.map((a, i) => (
            <a key={a.id} href={a.url} target="_blank" rel="noreferrer" className="card reveal" style={{animationDelay:`${i*0.03}s`}}>
              {a.image_url && <img src={a.image_url} alt="cover" className="card__media" loading="lazy" />}
              <div className="card__body">
                <div className="card__meta">{new Date(a.published_at).toLocaleString()}</div>
                <div className="card__title">{a.title}</div>
                <div className="card__summary">{a.summary}</div>
                <div style={{color:'var(--accent)', fontSize:14}}>{a.news_site} →</div>
              </div>
            </a>
          ))}
        </div>
        {hasMore && (
          <div style={{display:'flex', justifyContent:'center', marginTop:24}}>
            <button className="btn" onClick={() => { const p = page+1; setPage(p); load(p); }}>
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
