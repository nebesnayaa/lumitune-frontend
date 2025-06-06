import axiosInstance from "./axiosInstance";
import { HomeContentResponse, Track } from "../types/HomeContentData";
import { Image } from "../types/UserData";

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
    console.error("Помилка при отриманні головного контенту:", error);
    return null;    
  }
}

export const deleteImage = async (id: string | null) => {
  const response = await axiosInstance.post(`/images/delete/${id}`);
  return response.data;
}

export const getTrackById = async (id: string) => {
  try {
    console.log("track id ", id);
    const response = await axiosInstance.get(`/tracks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні треку за id:", error);
    return null;    
  }
};