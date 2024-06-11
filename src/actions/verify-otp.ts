"use server";

import { SignJWT } from "jose";
import { cookies } from "next/headers";

import prisma from "@/lib/db";
import { verifyOtpValidator } from "@/validators/verifyOtpValidator";

export const verifyOtp = async (otp: string, email: string) => {
  try {
    const parsedData = await verifyOtpValidator.parseAsync({ email, otp });
    const dbOtp = await prisma.otp.findUnique({
      where: {
        email: parsedData.email,
      },
    });

    if (!dbOtp || dbOtp?.otp !== parseInt(otp)) {
      throw new Error("Wrong OTP");
    }

    const token = await new SignJWT({
      allowChangePassword: true,
      email: parsedData.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    cookies().set("change-pass-token", token, {
      httpOnly: true,
      path: "/",
    });

    return { message: "OTP verified successfully" };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Some error occured. Please try again later!");
    }
  }
};
