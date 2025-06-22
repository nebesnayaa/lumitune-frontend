import { Playlist } from "../types/HomeContentData";
import axiosInstance from "./axiosInstance";

// GET
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

export const getPlaylistFavorites = async (): Promise<Playlist | null> => {
  try {
    const response = await axiosInstance.get(`/playlists/favourites`);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні Улюблених треків:", error);
    return null;    
  }
}

// POST
export const createPlaylist = async(name: string) => {
  try {
    const response = await axiosInstance.post("/playlists/", name);
    return response.data;
  } catch (error) {
    console.error("Помилка при створенні плейлиста:", error);
    return null;    
  }
}

export const addTrackToPlaylist = async(songId: string, playlistId: string) => {
  try {
    const response = await axiosInstance.post("/playlists/add-song", { playlistId, songId });
    return response.data;
  } catch (error) {
    console.error("Помилка при додаванні треку до плейлиста:", error);
    return null;    
  }
}

export const removeTrackFromPlaylist = async(songId: string, playlistId: string) => {
  try {
    const response = await axiosInstance.post("/playlists/remove-song", { playlistId, songId });
    return response.data;
  } catch (error) {
    console.error("Помилка при створенні плейлиста:", error);
    return null;    
  }
}