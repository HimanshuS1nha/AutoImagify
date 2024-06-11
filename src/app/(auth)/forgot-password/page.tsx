"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ZodError } from "zod";
import { useMutation } from "@tanstack/react-query";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import GradientWrapper from "@/components/GradientWrapper";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { verifyEmailValidator } from "@/validators/verifyEmailValidator";
import { verifyEmail } from "@/actions/verify-email";
import { verifyOtpValidator } from "@/validators/verifyOtpValidator";
import { verifyOtp } from "@/actions/verify-otp";

const ForgotPassword = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const { mutate: handleVerifyEmail, isPending: verifyEmailPending } =
    useMutation({
      mutationKey: ["verify-email"],
      mutationFn: async () => {
        const parsedData = await verifyEmailValidator.parseAsync({ email });
        return await verifyEmail(parsedData.email);
      },
      onSuccess: (data) => {
        setIsEmailVerified(true);
        toast.success(data.message);
      },
      onError: (error) => {
        if (error instanceof ZodError) {
          toast.error(error.errors[0].message);
        } else {
          toast.error(error.message);
        }
      },
    });

  const { mutate: handleVerifyOtp, isPending: verifyOtpPending } = useMutation({
    mutationKey: ["verify-otp"],
    mutationFn: async () => {
      const parsedData = await verifyOtpValidator.parseAsync({ email, otp });
      return await verifyOtp(parsedData.otp, parsedData.email);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      router.push("/change-password");
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
                Verify your email to continue to{" "}
                <span className="font-semibold">autoimagify</span>
              </p>
            </div>

            <form
              className="flex flex-col gap-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                if (isEmailVerified) {
                  handleVerifyOtp();
                } else {
                  handleVerifyEmail();
                }
              }}
            >
              <div className="flex flex-col gap-y-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  placeholder="Enter your email"
                  type="email"
                  id="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly={isEmailVerified}
                />
              </div>
              <div className="flex flex-col gap-y-3">
                {isEmailVerified && (
                  <>
                    <Label>Otp</Label>
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={(value) => setOtp(value)}
                    >
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </>
                )}
              </div>

              <Button
                type="submit"
                disabled={verifyEmailPending || verifyOtpPending}
              >
                {verifyEmailPending || verifyOtpPending
                  ? "Please wait..."
                  : isEmailVerified
                  ? "Submit"
                  : "Get Otp"}
              </Button>
            </form>
          </div>
        </div>
      </GradientWrapper>
    </section>
  );
};

export default ForgotPassword;
