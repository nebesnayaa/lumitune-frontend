import { Artist } from "../types/UserData";
import axiosInstance from "./axiosInstance";

export const getArtistById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/artists/${id}`);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні артиста:", error);
    throw error;
  }
};

export const getArtistByUserId = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/artists/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні артиста:", error);
    throw error;
  }
};

export const editArtistById = async (id: string, data: Artist): Promise<Artist> => {
  try {
    const response = await axiosInstance.put(`/artists/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Помилка при редагуванні  артиста:", error);
    throw error;
  }
};

export const updateArtistListeners = async(artistId: string) => {
  const response = await axiosInstance.patch(`/artists/add-listener/${artistId}`);
  return response.data;
}