import axiosInstance from "./axiosInstance";
import { HomeContentResponse, Image } from "../types/HomeContentData";

// GET
export const getContentHome = async (): Promise<HomeContentResponse | null> => {
  try {
    const response = await axiosInstance.get("/content/main");
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні головного контенту:", error);
    return null;    
  }
};

export const getMoods = async() => {
  const response = await axiosInstance.get("/mood");
  return response.data;
}

export const getGenres = async() => {
  const response = await axiosInstance.get("/genre");
  return response.data;
}

// POST
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

// DELETE
export const deleteImage = async (id: string | null) => {
  const response = await axiosInstance.delete(`/images/delete/{id}?id=${id}`);
  return response.data;
}





