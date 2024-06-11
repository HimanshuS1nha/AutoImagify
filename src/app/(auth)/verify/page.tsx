"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import GradientWrapper from "@/components/GradientWrapper";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useUser } from "@/hooks/useUser";
import { verify } from "@/actions/verify";

const Verify = () => {
  const { user } = useUser();
  const router = useRouter();

  const [otp, setOtp] = useState("");

  const { mutate: handleVerify, isPending } = useMutation({
    mutationKey: ["verify"],
    mutationFn: () => verify(user.email, otp),
    onSuccess: (data) => {
      toast.success(data.message);
      router.replace("/login");
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
              <p className="font-bold text-lg">Verify</p>
              <p className="text-sm text-gray-700">
                verify your email to continue to{" "}
                <span className="font-semibold">autoimagify</span>
              </p>
            </div>

            <form
              className="flex flex-col gap-y-6"
              onSubmit={(e) => {
                e.preventDefault();
                handleVerify();
              }}
            >
              <div className="flex flex-col gap-y-3">
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
              </div>
              <p className="text-blue-600 font-semibold text-sm">Resend Otp</p>
              <Button disabled={isPending} type="submit">
                {isPending ? "Please wait..." : "Verify"}
              </Button>
            </form>
          </div>
        </div>
      </GradientWrapper>
    </section>
  );
};

export default Verify;
