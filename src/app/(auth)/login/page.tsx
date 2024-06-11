"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import {
  loginValidator,
  loginValidatorType,
} from "@/validators/loginValidator";
import { login } from "@/actions/login";
import GradientWrapper from "@/components/GradientWrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/hooks/useUser";

export const dynamic = "force-dynamic";

const Login = () => {
  const { user, setUser } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const ref = searchParams.get("ref");

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm<loginValidatorType>({
    defaultValues: {
      password: "",
      email: "",
    },
    resolver: zodResolver(loginValidator),
  });

  const { mutate: handleLogin, isPending } = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      toast.success(data.message);
      reset();
      setUser({
        email: data.email,
        name: data.name,
        isLoggedIn: true,
        credits: data.credits,
      });
      if (ref) {
        router.push(`/${ref}`);
      } else {
        router.replace("/dashboard");
      }
    },
    onError: (error) => {
      toast.error(error.message);
      if (error.message === "Please verify your email") {
        setUser({ ...user, email: getValues("email") });
        router.push("/verify");
      }
    },
  });

  const handleUseDemoAccount = () => {
    setValue("email", "demo@gmail.com");
    setValue("password", "12345678");
  };
  return (
    <section className="flex flex-col justify-center items-center w-full h-full">
      <GradientWrapper>
        <div className="bg-white w-[90%] sm:w-[50%] md:w-[40%] lg:w-[30%] py-7 rounded-xl flex flex-col justify-center items-center gap-y-7 shadow shadow-gray-500">
          <p className="text-2xl font-bold">
            Auto<span className="text-blue-600">Imagify</span>
          </p>

          <div className="flex flex-col w-full px-7 gap-y-6">
            <div className="flex flex-col gap-y-2">
              <p className="font-bold text-lg">Sign In</p>
              <p className="text-sm text-gray-700">
                to continue to{" "}
                <span className="font-semibold">autoimagify</span>
              </p>
            </div>

            <form
              className="flex flex-col gap-y-6"
              onSubmit={handleSubmit((data) => handleLogin(data))}
            >
              <div className="flex flex-col gap-y-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  placeholder="Enter your email"
                  type="email"
                  id="email"
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
                  placeholder="Enter your password"
                  type="password"
                  id="password"
                  required
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <p className="text-rose-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="flex justify-between">
                <p
                  className="text-rose-500 hover:text-rose-700 text-sm font-semibold cursor-pointer"
                  onClick={handleUseDemoAccount}
                >
                  Use demo account
                </p>
                <Link
                  href={"/forgot-password"}
                  className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                >
                  Forgot Password?
                </Link>
              </div>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Please wait..." : "Login"}
              </Button>
            </form>

            <div className="flex w-full justify-center">
              <p className="text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href={"/sign-up"}
                  className={`font-semibold hover:text-blue-600 delay-75 transition-all cursor-pointer ${
                    isPending ? "pointer-events-none" : ""
                  }`}
                >
                  Signup
                </Link>
              </p>
            </div>
          </div>
        </div>
      </GradientWrapper>
    </section>
  );
};

const LoginPage = () => {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
};

export default LoginPage;
