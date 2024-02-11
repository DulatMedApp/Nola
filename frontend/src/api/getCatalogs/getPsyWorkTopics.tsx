import axios from "axios";

/*-------------------GetPsyWorkTopics--------------------- */
export const GET_PSY_WORKTOPICS_API_URL =
  "http://localhost:8080/api/psy/worktopics";

export interface PsyWorkTopics {
  id: number;
  name: string;
}

export const getPsyWorkTopics = async (): Promise<PsyWorkTopics[]> => {
  try {
    const response = await axios.get<PsyWorkTopics[]>(
      GET_PSY_WORKTOPICS_API_URL
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch work topics:", error);
    throw new Error("Failed to fetch work topics");
  }
};
