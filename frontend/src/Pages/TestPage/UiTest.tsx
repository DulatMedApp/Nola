import { useForm, SubmitHandler } from "react-hook-form";
// import { TestingApi } from "../../api/TestingApi";
import { useState } from "react";
import { CreatePsychologist } from "../../api/psychologists/CreatePsychologist";

// type Inputs = {
//   name: string;
//   surname: string;
//   img_url: string;
// };

type Inputs = {
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
};

export default function UiTest() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (formData: Inputs) => {
    console.log(formData);
    try {
      await CreatePsychologist(formData); // Update this line to pass the formData object
      alert("Психолог успешно создан");
    } catch (error) {
      alert("Ошибка при создании психолога: " + (error as Error).message);
    }
  };
  const [responseMessage, setResponseMessage] = useState<string>("");

  // const handleTestingApi = async () => {
  //   try {
  //     const response = await TestingApi({
  //       name: "",
  //       surname: "",
  //       img_url: "",
  //     });
  //     setResponseMessage(response.data);
  //   } catch (error) {
  //     setResponseMessage(
  //       "Ошибка при создании психолога: " + (error as Error).message
  //     );
  //   }
  // };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <text>Name:</text>
      <input defaultValue="" {...register("name")} />
      <text>Surname:</text>
      <input {...register("surname", { required: true })} />
      <text>email:</text>
      <input {...register("email", { required: true })} />
      <text>DOB:</text>
      <input {...register("date_of_birth", { required: true })} />
      <text>Gender:</text>
      <input {...register("gender", { required: true })} />
      <text>Phone:</text>
      <input {...register("phone_number", { required: true })} />
      <text>Password:</text>
      <input {...register("password", { required: true })} />
      <text>City:</text>
      <input {...register("city", { required: true })} />
      <text>About:</text>
      <input {...register("about_psychologist", { required: true })} />
      <text>Experience:</text>
      <input
        type="number"
        {...register("experience_years", { required: true })}
      />
      <text>Cost:</text>
      <input
        type="number"
        {...register("consultation_cost", { required: true })}
      />
      <text>Duration:</text>
      <input
        type="number"
        {...register("consultation_duration", { required: true })}
      />
      <text>Member:</text>
      <input {...register("community_member", { required: true })} />

      <input type="submit" />
    </form>
  );
}
