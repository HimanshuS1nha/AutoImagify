import { z } from "zod";

export const verifyOtpValidator = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  otp: z
    .string({ required_error: "OTP is required" })
    .trim()
    .min(6, { message: "OTP must be 6 digits long" })
    .max(6, { message: "OTP must be 6 digits long" }),
});
