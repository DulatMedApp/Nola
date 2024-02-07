import { API_URL, SmsCodeData } from "../api";
import axios from "axios";

export const sendSmsCode = async (data: SmsCodeData): Promise<void> => {
  try {
    await axios.post(API_URL, data);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
