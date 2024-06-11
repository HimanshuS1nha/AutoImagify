"use server";

import { generate } from "otp-generator";
import { ZodError } from "zod";

import prisma from "@/lib/db";
import { sendEmail } from "@/lib/send-email";
import { verifyEmailValidator } from "@/validators/verifyEmailValidator";

export const verifyEmail = async (email: string) => {
  try {
    const parsedData = await verifyEmailValidator.parseAsync({ email });

    const user = await prisma.users.findUnique({
      where: {
        email: parsedData.email,
      },
    });
    if (!user) {
      throw new Error("Email does not exist");
    }

    const otp = generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
    });
    await sendEmail(user.email, parseInt(otp));
    await prisma.otp.deleteMany({
      where: {
        email: user.email,
      },
    });
    await prisma.otp.create({
      data: {
        otp: parseInt(otp),
        email: user.email,
        expiresIn: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    return { message: "Otp sent successfully" };
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
