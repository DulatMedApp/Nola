import axios from "axios";

export const GET_THERATY_METHODS_API_URL =
  "http://localhost:8080/api/catalog/therapy-methods";

export interface TherapyMethods {
  id: number;
  name: string;
}

export const getTherapyMethods = async (): Promise<TherapyMethods[]> => {
  try {
    const response = await axios.get<TherapyMethods[]>(
      GET_THERATY_METHODS_API_URL
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch TherapyMethod", error);
    throw new Error("Failed to fetch TherapyMethod");
  }
};
