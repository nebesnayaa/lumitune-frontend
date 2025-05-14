import axiosInstance from "./axiosInstance";

export interface Region {
  id: string;
  name: string;
  type: "COUNTRY" | "CITY";
  parentId: string | null;
}

export const fetchCountries = async (): Promise<Region[]> => {
  const response = await axiosInstance.get<Region[]>("/regions/countries");
  return response.data.filter(region => region.type === "COUNTRY");
};

export const fetchCitiesByCountryId = async (countryId: string): Promise<Region[]> => {
  const response = await axiosInstance.get<Region[]>(`/regions/parent/${countryId}`);
  return response.data.filter(region => region.type === "CITY");
};

export const fetchRegionById = async (regionId: string): Promise<Region> => {
  const response = await axiosInstance.get<Region>(`/regions/${regionId}`);
  return response.data;
};