"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ZodError } from "zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import GradientWrapper from "@/components/GradientWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  changeUserPasswordType,
  changeUserPasswordValidator,
} from "@/validators/changeUserPasswordValidator";
import { changeUserPassword } from "@/actions/change-user-password";

const ChangeUserPassword = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<changeUserPasswordType>({
    defaultValues: {
      confirmPassword: "",
      newPassword: "",
      oldPassword: "",
    },
    resolver: zodResolver(changeUserPasswordValidator),
  });

  const { mutate: handleChangeUserPassword, isPending } = useMutation({
    mutationKey: ["change-user-password"],
    mutationFn: async (values: changeUserPasswordType) => {
      if (values.newPassword !== values.confirmPassword) {
        throw new Error("Passwords do not match");
      }
      return await changeUserPassword(values);
    },
    onSuccess: (data) => {
      reset();
      toast.success(data.message);
      router.replace("/dashboard");
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
              <p className="font-bold text-lg">Change Password</p>
              <p className="text-sm text-gray-700">Change your password</p>
            </div>

            <form
              className="flex flex-col gap-y-6"
              onSubmit={handleSubmit((data) => handleChangeUserPassword(data))}
            >
              <div className="flex flex-col gap-y-3">
                <Label htmlFor="oldPassword">Old Password</Label>
                <Input
                  placeholder="Enter your old password"
                  type="password"
                  id="oldPassword"
                  required
                  {...register("oldPassword", { required: true })}
                />
                {errors.oldPassword && (
                  <p className="text-rose-500 text-sm">
                    {errors.oldPassword.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-y-3">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  placeholder="Enter your new password"
                  type="password"
                  id="newPassword"
                  required
                  {...register("newPassword", { required: true })}
                />
                {errors.newPassword && (
                  <p className="text-rose-500 text-sm">
                    {errors.newPassword.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-y-3">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  placeholder="Confirm your new password"
                  type="password"
                  id="confirmPassword"
                  required
                  {...register("confirmPassword", { required: true })}
                />
                {errors.confirmPassword && (
                  <p className="text-rose-500 text-sm">
                    {errors.confirmPassword.message}
                  </p>
                )}
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

export default ChangeUserPassword;
