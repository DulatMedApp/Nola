import axios from "axios";

export const GET_LANGUAGES_API_URL =
  "http://localhost:8080/api/catalog/languages";

export interface Languages {
  id: number;
  name: string;
}

export const getLanguages = async (): Promise<Languages[]> => {
  try {
    const response = await axios.get<Languages[]>(GET_LANGUAGES_API_URL);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch languages", error);
    throw new Error("Failed to fetch languages");
  }
};
