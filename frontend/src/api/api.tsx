/*------------Send SMS------------------------------------ */
export const SEND_SMS_API_URL = "http://localhost:8080/api/send-sms/user-exist";

export interface SmsCodeData {
  phone_number: string;
}
