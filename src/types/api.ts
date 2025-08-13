export type SpaceflightArticle = {
  id: number;
  title: string;
  url: string;
  image_url: string | null;
  news_site: string;
  published_at: string;
  summary: string;
};

export type APOD = {
  date: string;
  explanation: string;
  hdurl?: string;
  url: string;
  media_type: 'image' | 'video';
  title: string;
};

export type RoverPhoto = {
  id: number;
  img_src: string;
  earth_date: string;
  camera: { name: string; full_name: string; };
  rover: { name: string; landing_date: string; status: string; };
};
