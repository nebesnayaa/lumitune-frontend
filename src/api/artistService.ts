import axiosInstance from "./axiosInstance";

export const getArtistById = async (id: string) => {
  try {
    console.log("Received id: ", id);
    const response = await axiosInstance.get(`/artists/${id}`);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні користувача:", error);
    throw error;
  }
};