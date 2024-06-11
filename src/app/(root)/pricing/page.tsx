"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

import { createOrder } from "@/actions/create-order";
import GradientWrapper from "@/components/GradientWrapper";
import PricingCard from "@/components/PricingCard";
import Title from "@/components/Title";
import { useUser } from "@/hooks/useUser";

const Pricing = () => {
  const router = useRouter();
  const { user } = useUser();

  const { mutate: handleMakePayment, isPending } = useMutation({
    mutationKey: ["make-payment"],
    mutationFn: (data: { amount: number; email: string }) =>
      createOrder(data.amount, data.email),
    onSuccess: (data) => {
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: data.amount,
        currency: "INR",
        name: "AutoImagify",
        description: "Test Transaction",
        image: `/logo.webp`,
        order_id: data.orderId,
        callback_url: "/api/success",
        theme: {
          color: "#2563eb",
        },
      };

      // @ts-ignore
      const razorpayModal = new window.Razorpay(options);
      razorpayModal.open();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const pricing = [
    {
      credits: "10",
      tagline: "Everything you need to start editing images!",
      price: "0",
      buttonTitle: "Get Started",
      features: ["Edit images", "(Probably) cheaper than a cup of coffee"],
      recommended: false,
      onClick: () => router.push("/login"),
    },
    {
      credits: "50",
      tagline: "Want to edit more images!",
      price: "10",
      buttonTitle: "Get Started",
      features: ["More credits to edit images", "Affordable"],
      recommended: true,
      onClick: (amount: string) => {
        if (user.email) {
          handleMakePayment({
            amount: parseInt(amount) * 100,
            email: user.email,
          });
        } else {
          router.push("/login?ref=pricing");
        }
      },
    },
    {
      credits: "Custom",
      tagline: "Still want to edit more images!",
      price: "Custom",
      buttonTitle: "Contact Us",
      features: ["Usage based pricing", "Dedicated support"],
      recommended: false,
      onClick: () => router.push("/contact-us"),
    },
  ];
  return (
    <section className="flex flex-col py-10">
      <GradientWrapper>
        <Title
          title="Pricing"
          text="We wanted pricing to be as simple as possible. No calculator needed."
        />

        <div className="flex justify-center">
          <div className="flex justify-center gap-x-3 mt-8 w-[75%] flex-wrap items-center gap-y-6">
            {pricing.map((item) => {
              return (
                <PricingCard
                  pricing={item}
                  key={item.credits}
                  isPending={isPending}
                />
              );
            })}
          </div>
        </div>
      </GradientWrapper>
    </section>
  );
};

export default Pricing;
