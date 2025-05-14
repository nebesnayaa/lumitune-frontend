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