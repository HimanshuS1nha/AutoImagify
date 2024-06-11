"use client";

import { FaCheck } from "react-icons/fa6";

import { Button } from "./ui/button";

const PricingCard = ({
  pricing,
  isPending,
}: {
  pricing: {
    credits: string;
    tagline: string;
    recommended?: boolean;
    price: string;
    buttonTitle: string;
    features: string[];
    onClick: (amount: string) => void;
  };
  isPending: boolean;
}) => {
  return (
    <div
      className={`bg-white rounded-lg px-5 py-10 flex flex-col shadow-sm shadow-gray-500 w-[347px] border-2 ${
        pricing.recommended ? "border-blue-600" : "border-transparent"
      }`}
    >
      <div className="flex flex-col gap-y-5">
        <div className="flex justify-between">
          <p className="text-2xl font-semibold">{pricing.credits} Credits</p>
          {pricing.recommended && (
            <div className="bg-blue-200 py-1.5 px-3 rounded-full flex items-center justify-center">
              <p className="text-xs font-bold text-blue-600">Recommended</p>
            </div>
          )}
        </div>
        <p className="text-gray-700 text-sm">{pricing.tagline}</p>
      </div>
      <div className="flex flex-col gap-y-5 mt-8">
        <p className="font-semibold text-gray-700">
          <span className="text-3xl text-black">₹{pricing.price}</span>/month
        </p>
        <Button
          variant={pricing.recommended ? "default" : "outline"}
          disabled={isPending}
          className={`${
            pricing.recommended
              ? ""
              : "border-blue-300 hover:border-blue-600 delay-75 transition-all text-blue-600 hover:bg-white hover:text-blue-600"
          }`}
          onClick={() => pricing.onClick(pricing.price)}
        >
          {pricing.buttonTitle}
        </Button>
      </div>
      <div className="flex flex-col mt-10 gap-y-5">
        {pricing.features.map((item) => {
          return (
            <div className="flex gap-x-3 items-center" key={item}>
              <FaCheck color="blue" size={20} />
              <p className="text-gray-700 text-sm">{item}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PricingCard;
