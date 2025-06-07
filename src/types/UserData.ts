import { Album, Image } from "./HomeContentData";

export interface UserData {
  id: string;
  birthDate: string;
  regionId: string;
  isArtist: boolean;
  email: string;
}

export type UserRole = "USER" | "ADMIN";

export interface User {
  id: string;
  username: string;
  password: string;
  avatar: Image | null;
  images: Image[];
  role: UserRole;
  accSubscribers: number;
  accFollowings: number;
  userData: UserData;
}

export interface Artist {
  id: string;
  user: User;
  bio: string;
  bioPics: Image[];
  monthlyListeners: number;
  albums: Album[];
}