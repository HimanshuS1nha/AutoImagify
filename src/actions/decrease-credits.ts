"use server";

import { jwtVerify } from "jose";
import { cookies } from "next/headers";

import prisma from "@/lib/db";

export const decreaseCredits = async (number: number) => {
  try {
    const token = cookies().get("token")?.value;
    if (!token) {
      return false;
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    if (!payload.email) {
      return false;
    }

    const user = await prisma.users.findUnique({
      where: {
        email: payload.email as string,
      },
    });
    if (!user || user.credits < number) {
      return false;
    }

    const newCredits = user.credits - number;

    await prisma.users.update({
      where: {
        email: user.email,
      },
      data: {
        credits: newCredits,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
};
