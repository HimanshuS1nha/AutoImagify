"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { signup } from "@/actions/signup";
import GradientWrapper from "@/components/GradientWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signupValidatorType } from "@/validators/signupValidator";
import { useUser } from "@/hooks/useUser";

const Signup = () => {
  const router = useRouter();
  const { setUser, user } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<signupValidatorType>({
    defaultValues: {
      confirmPassword: "",
      email: "",
      name: "",
      password: "",
    },
  });

  const { mutate: handleSignup, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: signup,
    onSuccess: (data) => {
      toast.success(data.message);
      reset();
      setUser({ ...user, email: data.email });
      router.push("/verify");
    },
    onError: (error) => {
      toast.error(error.message);
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
              <p className="font-bold text-lg">Sign Up</p>
              <p className="text-sm text-gray-700">
                create an account to continue to{" "}
                <span className="font-semibold">autoimagify</span>
              </p>
            </div>

            <form
              className="flex flex-col gap-y-6"
              onSubmit={handleSubmit((data) => handleSignup(data))}
            >
              <div className="flex flex-col gap-y-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  required
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <p className="text-rose-500 text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-y-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <p className="text-rose-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-y-3">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-rose-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-y-3">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm password"
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
                {isPending ? "Please wait..." : "Signup"}
              </Button>
            </form>
            <div className="flex w-full justify-center">
              <p className="text-sm">
                Already have an account?{" "}
                <Link
                  href={"/login"}
                  className={`font-semibold hover:text-blue-600 delay-75 transition-all cursor-pointer ${
                    isPending ? "pointer-events-none" : ""
                  }`}
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </GradientWrapper>
    </section>
  );
};

export default Signup;
