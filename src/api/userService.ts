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
export interface LoginPayload {
  username: string;
  password: string;
}

export const registerUser = async (data: RegistrationPayload) => {
  const response = await axiosInstance.post("/auth/sign-up", data);
  return response.data;
};

export const loginUser = async (data: LoginPayload) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};

export const isUsernameUnique = async (username: string): Promise<boolean> => {
  const response = await axiosInstance.get(`/auth/isunique/${encodeURIComponent(username)}`);
  return response.data;
};

export const getUserByUsername = async (username: string) => {
  try {
    const response = await axiosInstance.get(`/api/users/username/${username}`);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні користувача:", error);
    throw error;
  }
};