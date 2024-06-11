"use server";

import { compare, hash } from "bcrypt";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { ZodError } from "zod";

import prisma from "@/lib/db";
import { changeUserPasswordValidator } from "@/validators/changeUserPasswordValidator";
import { changeUserPasswordType } from "@/validators/changeUserPasswordValidator";

export const changeUserPassword = async (data: changeUserPasswordType) => {
  try {
    const { confirmPassword, newPassword, oldPassword } =
      await changeUserPasswordValidator.parseAsync(data);

    if (newPassword !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    const token = cookies().get("token")?.value;
    if (!token) {
      throw new Error("Unauthorized");
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
      throw new Error("Unauthorized");
    }

    const doesPasswordMatch = await compare(oldPassword, user.password);
    if (!doesPasswordMatch) {
      throw new Error("Wrong Password");
    }

    const hashedPassword = await hash(newPassword, 10);

    await prisma.users.update({
      where: {
        email: user.email,
      },
      data: {
        password: hashedPassword,
      },
    });

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
