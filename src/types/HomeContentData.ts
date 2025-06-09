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
  artistName: string;
  // artistId: string;
  albumName: string;
  album: string;
  segNumber: number;
  playsNumber: number;
  coverUrl: string;
  cover: Image;
  url: string;
  explicit: false;
}

export interface Album {
  id: string;
  albumName: string;
  author: string;
  imageLink: string;
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

