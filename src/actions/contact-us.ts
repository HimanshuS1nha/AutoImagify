"use server";

import prisma from "@/lib/db";
import {
  contactUsValidator,
  contactUsValidatorType,
} from "@/validators/contactUsValidator";
import { ZodError } from "zod";

export const contactUs = async (data: contactUsValidatorType) => {
  try {
    const { email, message, name, subject } =
      await contactUsValidator.parseAsync(data);

    await prisma.contactUs.create({
      data: {
        email,
        message,
        name,
        subject,
      },
    });

    return { message: "Form submitted successfully" };
  } catch (error) {
    if (error instanceof ZodError) {
      throw new Error(error.errors[0].message);
    } else if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Some error occured. Please try again later!");
    }
  }
};
