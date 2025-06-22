import axiosInstance from "./axiosInstance";
import { Track, Image } from "../types/HomeContentData";
import { Artist } from "../types/UserData";

export interface AlbumPayload {
  name: string,
  type: string,
  label: string,
  duration: number,
  relDate: Date,
  cover: Image,
  artist: Artist,
  tracks: Track[],
}

// GET
export const getAlbums = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/albums?artistId=${id}`);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні альбомів артиста:", error);
    return null;    
  }
}

export const getAlbumById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/albums/${id}`);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні альбому за id:", error);
    return null;    
  }
};

// POST
export const createAlbum = async (data: AlbumPayload) => {
  try {
    const response = await axiosInstance.post("/albums", data);
    return response.data;
  } catch (error) {
    console.error("Помилка при створенні альбома:", error);
    return null;    
  }
}
