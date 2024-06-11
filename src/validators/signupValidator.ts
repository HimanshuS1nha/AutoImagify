import { z } from "zod";

export const signupValidator = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(1, { message: "Please fill in the name field" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Please enter a valid email" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "Password must be atleast 8 characters long" }),
  confirmPassword: z
    .string({ required_error: "Confirm password is required" })
    .trim()
    .min(8, { message: "Confirm password must be atleast 8 characters long" }),
});

export type signupValidatorType = z.infer<typeof signupValidator>;
