"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";
import { useMutation } from "@tanstack/react-query";

import GradientWrapper from "@/components/GradientWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { changePasswordValidator } from "@/validators/changePasswordValidator";
import { changePassword } from "@/actions/change-password";

const ChangePassword = () => {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { mutate: handleChangePassword, isPending } = useMutation({
    mutationKey: ["change-password"],
    mutationFn: async () => {
      const parsedData = await changePasswordValidator.parseAsync({
        password,
        confirmPassword,
      });
      if (parsedData.password !== parsedData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      return await changePassword(
        parsedData.password,
        parsedData.confirmPassword
      );
    },
    onSuccess: (data) => {
      toast.success(data.message);
      router.replace("/login");
    },
    onError: (error) => {
      if (error instanceof ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error(error.message);
      }
    },
  });
  return (
    <section className="flex flex-col justify-center items-center w-full h-full">
      <GradientWrapper>
        <div className="bg-white w-[90%] sm:w-[50%] md:w-[40%] lg:w-[30%] py-7 rounded-xl flex flex-col justify-center items-center gap-y-7 shadow shadow-gray-500">
          <p className="text-2xl font-bold">
            Auto<span className="text-blue-600">Imagify</span>
          </p>

          <div className="flex flex-col w-full px-7 gap-y-6">
            <div className="flex flex-col gap-y-2">
              <p className="font-bold text-lg">Forgot Password</p>
              <p className="text-sm text-gray-700">
                Enter new password to continue to{" "}
                <span className="font-semibold">autoimagify</span>
              </p>
            </div>

            <form
              className="flex flex-col gap-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleChangePassword();
              }}
            >
              <div className="flex flex-col gap-y-3">
                <Label htmlFor="password">New Password</Label>
                <Input
                  placeholder="Enter your new password"
                  type="password"
                  id="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-y-3">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  placeholder="Confirm your new password"
                  type="password"
                  id="confirmPassword"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <Button type="submit" disabled={isPending}>
                {isPending ? "Please wait..." : "Change Password"}
              </Button>
            </form>
          </div>
        </div>
      </GradientWrapper>
    </section>
  );
};

export default ChangePassword;
