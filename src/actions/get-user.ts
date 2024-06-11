"use server";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";

import prisma from "@/lib/db";

export const getUser = async () => {
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const user = await prisma.users.findUnique({
      where: {
        email: payload.email as string,
      },
    });

    if (!user) {
      return null;
    }

    return {
      name: user.name,
      email: user.email,
      credits: user.credits,
      isLoggedIn: true,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Some error occured. Please try again later!");
    }
  }
};
