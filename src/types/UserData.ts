export interface Image {
  id: string;
  owner: string;
  url: string | null;
}

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
  avatarId: Image | null;
  images: Image[];
  role: UserRole;
  accSubscribers: number;
  accFollowings: number;
  userData: UserData;
}