import { LoginFormData } from "../types/LoginFormData";
import { Artist, User } from "../types/UserData";
import axiosInstance from "./axiosInstance";

export interface RegistrationPayload {
  username: string;
  password: string;
  avatarId: string | null;
  role: "USER";
  accSubscribers: number;
  accFollowings: number;
  userData: {
    id: string;
    birthDate: string;
    regionId: string;
    isArtist: boolean;
    email: string;
  };
}

export const registerUser = async (data: RegistrationPayload) => {
  const response = await axiosInstance.post("/auth/sign-up", data);
  return response.data;
};

export const loginUser = async (data: LoginFormData) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.post("/users/logout");
  return response.data;
};

export const isUsernameUnique = async (username: string): Promise<boolean> => {
  const response = await axiosInstance.get(`/auth/isunique/${encodeURIComponent(username)}`);
  return response.data;
};

export const getUserByUsername = async (username: string) => {
  try {
    const response = await axiosInstance.get(`/users/username/${username}`);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні користувача:", error);
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get(`/users/current`);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні поточного користувача:", error);
    throw error;
  }
};

export const editUser = async (data: User): Promise<User> => {
  try {
    const response = await axiosInstance.put(`/users/edit`, data);
    return response.data;
  } catch (error) {
    console.error("Помилка при редагуванні користувача:", error);
    throw error;
  }
};

export const getArtistById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/artists/${id}`);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні користувача:", error);
    throw error;
  }
};

export const editArtistById = async (id: string, data: Artist): Promise<Artist> => {
  try {
    const response = await axiosInstance.put(`/artists/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Помилка при редагуванні користувача:", error);
    throw error;
  }
};

export const updateArtistListeners = async(artistId: string) => {
  const response = await axiosInstance.patch(`/artists/add-listener/${artistId}`);
  return response.data;
}