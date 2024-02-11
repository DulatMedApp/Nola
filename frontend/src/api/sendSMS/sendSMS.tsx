import { SEND_SMS_API_URL, SmsCodeData } from "../api";
import axios from "axios";

export const sendSmsCode = async (data: SmsCodeData): Promise<void> => {
  try {
    await axios.post(SEND_SMS_API_URL, data);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
