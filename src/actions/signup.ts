"use server";

import { ZodError } from "zod";
import { hash } from "bcrypt";
import { generate } from "otp-generator";

import prisma from "@/lib/db";
import {
  signupValidator,
  signupValidatorType,
} from "@/validators/signupValidator";
import { sendEmail } from "@/lib/send-email";

export const signup = async (data: signupValidatorType) => {
  try {
    const { confirmPassword, email, name, password } =
      await signupValidator.parseAsync(data);

    if (confirmPassword !== password) {
      throw new Error("Passwords do not match");
    }

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    if (user) {
      throw new Error("Email is already taken");
    }

    const hashedPassword = await hash(password, 10);

    await prisma.users.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const otp = generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      specialChars: false,
      upperCaseAlphabets: false,
    });

    const isEmailSent = await sendEmail(email, parseInt(otp));

    if (!isEmailSent) {
      throw new Error("Some error occured. Please try again later!");
    }

    await prisma.otp.create({
      data: {
        expiresIn: new Date(Date.now() + 5 * 60 * 1000),
        otp: parseInt(otp),
        email: email,
      },
    });

    return { message: "Account created successfully", email };
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
