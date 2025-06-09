import axiosInstance from "./axiosInstance";
import { HomeContentResponse, Image, Playlist } from "../types/HomeContentData";

export const getContentHome = async (): Promise<HomeContentResponse | null> => {
  try {
    const response = await axiosInstance.get("/content/main");
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні головного контенту:", error);
    return null;    
  }
};

export const uploadImage = async (file: FormData): Promise<Image | null> => {
  try {
    const response = await axiosInstance.post("/images/upload", file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Помилка при завантаженні аватарки:", error);
    return null;    
  }
}

export const deleteImage = async (id: string | null) => {
  const response = await axiosInstance.delete(`/images/delete/{id}?id=${id}`);
  return response.data;
}

export const getTrackById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/tracks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні треку за id:", error);
    return null;    
  }
};


export const getPlaylistsByUserId = async (id: string): Promise<Playlist[] | null> => {
  try {
    const response = await axiosInstance.get(`/playlists/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні плейлістів юзера:", error);
    return null;    
  }
};


export const getPlaylistById = async (id: string): Promise<Playlist | null> => {
  try {
    const response = await axiosInstance.get(`/playlists/${id}`);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні плейліста:", error);
    return null;    
  }
};

export const createPlaylist = async(name: string) => {
  try {
    const response = await axiosInstance.post("/playlists/", name);
    return response.data;
  } catch (error) {
    console.error("Помилка при створенні плейлиста:", error);
    return null;    
  }
}

