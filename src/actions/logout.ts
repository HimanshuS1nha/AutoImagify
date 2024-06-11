"use server";

import { cookies } from "next/headers";

export const logout = async () => {
  try {
    cookies().delete("token");
    return { message: "Logged out successfully" };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Some error occured. Please try again later!");
    }
  }
};
