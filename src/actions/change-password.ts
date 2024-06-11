"use server";

import { hash } from "bcrypt";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { ZodError } from "zod";

import prisma from "@/lib/db";
import { changePasswordValidator } from "@/validators/changePasswordValidator";

export const changePassword = async (
  password: string,
  confirmPassword: string
) => {
  try {
    const parsedData = await changePasswordValidator.parseAsync({
      password,
      confirmPassword,
    });
    if (parsedData.password !== parsedData.confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const token = cookies().get("change-pass-token")?.value;
    if (!token) {
      throw new Error("Unauthorized");
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    if (!payload.allowChangePassword) {
      throw new Error("Unauthorized");
    }

    const user = await prisma.users.findUnique({
      where: {
        email: payload.email as string,
      },
    });
    if (!user) {
      throw new Error("Unauthorized");
    }

    const hashedPassword = await hash(password, 10);

    await prisma.users.update({
      where: {
        email: user.email,
      },
      data: {
        password: hashedPassword,
      },
    });

    cookies().delete("change-pass-token");

    return { message: "Password changed successfully" };
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
