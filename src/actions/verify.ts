"use server";

import prisma from "@/lib/db";

export const verify = async (email: string, otp: string) => {
  try {
    const dbOtp = await prisma.otp.findUnique({
      where: { email },
    });

    if (!dbOtp) {
      throw new Error("Invalid request");
    }

    if (dbOtp.expiresIn < new Date()) {
      throw new Error("Otp expired");
    }

    if (dbOtp.otp !== parseInt(otp)) {
      throw new Error("Otp is not valid");
    }

    await prisma.users.update({
      where: {
        email,
      },
      data: {
        isVerified: true,
      },
    });

    await prisma.otp.deleteMany({
      where: {
        email,
      },
    });

    return { message: "Email verified successfully" };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Some error occured. Please try again later!");
    }
  }
};
