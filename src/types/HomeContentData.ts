export interface CarouselItem {
  [key: string]: string;
}

export interface Track {
  id: string;
  name: string;
  duration: number;
  artistName: string;
  albumName: string;
  segNumber: number;
  playsNumber: number;
  coverUrl: string;
  url: string;
  explicit: false;
}

export interface Album {
  albumName: string;
  author: string;
  imageLink: string;
  tracksQnt: number;
  tracks: Track[];
}

export interface HomeContentResponse {
  carousel: CarouselItem[];
  recommendations: Track[];
  newReleases: Album[];
}