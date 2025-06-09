export interface CarouselItem {
  [key: string]: string;
}

export interface HomeContentResponse {
  carousel: CarouselItem[];
  recommendations: Track[];
  newReleases: Album[];
}

export interface Image {
  id: string;
  owner: string;
  url: string | null;
}

export interface Track {
  id: string;
  name: string;
  duration: number;
  artistId: string;
  albumId: string;
  segNumber: number;
  playsNumber: number;
  url: string;
  explicit: false;
}

export interface Album {
  id: string;
  albumName: string;
  author: string;
  cover: Image;
  tracksQnt: number;
  tracks: Track[];
}

export interface Playlist{
  id: string;
  name: string;
  userName: string;
  coverUrl: Image;
  tracks: Track[];
  private: boolean;
}

