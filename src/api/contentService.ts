import axiosInstance from "./axiosInstance";
import { HomeContentResponse, Image, Playlist, Track } from "../types/HomeContentData";
import { Artist } from "../types/UserData";

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

export const createTrack = async(formData: FormData) => {
  try {
    const response = await axiosInstance.post("/tracks", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error("Помилка при створенні треку:", error);
    return null;    
  }
}

export const trackSearch = async (name: string) => {
  try {
    const response = await axiosInstance.get(`/tracks/search?name=${name}`);
    return response.data;
  } catch (error) {
    console.error("Помилка при пошуку треку:", error);
    return null;    
  }
}

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

export const createAlbum = async (data: AlbumPayload) => {
  try {
    const response = await axiosInstance.post("/albums", data);
    return response.data;
  } catch (error) {
    console.error("Помилка при створенні альбома:", error);
    return null;    
  }
}

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

export const updateTrackListeners = async(songId: string) => {
  const response = await axiosInstance.patch(`/tracks/add-listening/${songId}`);
  return response.data;
}


export const getMoods = async() => {
  const response = await axiosInstance.get("/mood");
  return response.data;
}

export const getGenres = async() => {
  const response = await axiosInstance.get("/genre");
  return response.data;
}

export const getTracksByMood = async(mood: string) => {
  const response = await axiosInstance.get(`/tracks/mood/${mood}`);
  return response.data;
}

export const getTracksByGenre = async(genre: string) => {
  const response = await axiosInstance.get(`/tracks/genre/${genre}`);
  return response.data;
}
