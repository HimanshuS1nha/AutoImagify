"use server";

import { compare } from "bcrypt";
import { ZodError } from "zod";
import { SignJWT } from "jose";
import { cookies } from "next/headers";
import { generate } from "otp-generator";

import prisma from "@/lib/db";
import {
  loginValidator,
  loginValidatorType,
} from "@/validators/loginValidator";
import { sendEmail } from "@/lib/send-email";

export const login = async (data: loginValidatorType) => {
  try {
    const { email, password } = await loginValidator.parseAsync(data);

    const user = await prisma.users.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const doesPasswordMatch = await compare(password, user.password);
    if (!doesPasswordMatch) {
      throw new Error("Invalid credentials");
    }

    if (!user.isVerified) {
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
      throw new Error("Please verify your email");
    }

    const token = await new SignJWT({ email: user.email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    cookies().set("token", token, {
      httpOnly: true,
      path: "/",
    });

    return {
      message: "Logged in successfully",
      email: user.email,
      name: user.name,
      credits: user.credits,
    };
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
