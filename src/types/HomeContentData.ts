export interface CarouselItem {
  [key: string]: string;
}

export interface Track {
  id: string;
  name: string;
  duration: number;
  author: string;
  albumName: string;
  segNumber: number;
  playsNumber: number;
  imageLink: string;
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
  recommendations: Album[];
  newReleases: Album[];
}