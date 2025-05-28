export interface CarouselItem {
  [key: string]: string;
}

export interface Album {
  albumName: string;
  author: string;
  imageLink: string;
  tracksQnt: number;
}

export interface HomeContentResponse {
  carousel: CarouselItem[];
  recommendations: Album[];
  newReleases: Album[];
}