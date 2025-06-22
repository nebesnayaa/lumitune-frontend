import axiosInstance from "./axiosInstance";

// GET
export const getTrackById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/tracks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Помилка при отриманні треку за id:", error);
    return null;    
  }
};

export const trackSearch = async (name: string) => {
  try {
    const response = await axiosInstance.get(`/tracks/search?name=${name}`);
    return response.data;
  } catch (error) {
    console.error("Помилка при пошуку треку:", error);
    return null;    
  }
}

export const getTracksByMood = async(mood: string) => {
  const response = await axiosInstance.get(`/tracks/mood/${mood}`);
  return response.data;
}

export const getTracksByGenre = async(genre: string) => {
  const response = await axiosInstance.get(`/tracks/genre/${genre}`);
  return response.data;
}

// POST
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

// PATCH
export const updateTrackListeners = async(songId: string) => {
  const response = await axiosInstance.patch(`/tracks/add-listening/${songId}`);
  return response.data;
}

export const setTrackMood = async(formData: FormData) => {
  try {
    const response = await axiosInstance.patch("/tracks/set-mooods", formData);
    return response.data;
  } catch (error) {
    console.error("Помилка при встановленні настрою треку:", error);
    return null;    
  }
}

export const setTrackGenre = async(formData: FormData) => {
  try {
    const response = await axiosInstance.patch("/tracks/set-genres", formData);
    return response.data;
  } catch (error) {
    console.error("Помилка при встановленні настрою треку:", error);
    return null;    
  }
}

// DELETE
export const deleteTracks = async(id: string) => {
  try {
    const response = await axiosInstance.delete(`/tracks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Помилка при видаленні треку:", error);
    return null;    
  }
}