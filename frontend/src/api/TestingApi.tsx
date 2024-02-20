import axios, { AxiosResponse } from "axios";

interface TestingApi1 {
  name: string;
  surname: string;
  img_url: string;
}

export const TestingApi = async (
  formData: TestingApi1
): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/test",
      formData
    );
    return response;
  } catch (error) {
    throw new Error(
      "Error while creating psychologist: " + (error as Error).message
    );
  }
};
