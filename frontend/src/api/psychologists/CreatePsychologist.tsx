import axios from "axios";

interface CreatePsychologist {
  name: string;
  surname: string;
  email: string;
  date_of_birth: string;
  gender: string;
  phone_number: string;
  password: string;
  city: string;
  therapy_method: string;
  about_psychologist: string;
  experience_years: number;
  consultation_cost: number;
  consultation_duration: number;
  community_member: string;
}

export const CreatePsychologist = async (formData: CreatePsychologist) => {
  try {
    formData.date_of_birth = "18.07.1990";
    formData.phone_number = "+7771015744";
    formData.password = "password";

    formData.experience_years = parseInt(formData.consultation_cost.toString());
    formData.consultation_cost = parseInt(
      formData.consultation_cost.toString()
    );
    formData.consultation_duration = parseInt(
      formData.consultation_duration.toString()
    );
    await axios.post(
      "http://localhost:8080/api/pshychologist/create",
      formData
    );
  } catch (error) {
    throw new Error(
      "Error while creating psychologist." + (error as Error).message
    );
  }
};
