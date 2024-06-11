import { z } from "zod";

export const contactUsValidator = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(1, { message: "Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "please enter a valid email" }),
  subject: z.string({ required_error: "Subject is required" }),
  message: z.string({ required_error: "Message is required" }),
});

export type contactUsValidatorType = z.infer<typeof contactUsValidator>;
