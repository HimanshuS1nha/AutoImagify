import Image from "next/image";
import Link from "next/link";

import GradientWrapper from "@/components/GradientWrapper";
import { Button } from "@/components/ui/button";

const PaymentSuccess = () => {
  return (
    <section className="flex flex-col pt-10 pb-10 lg:pb-0 lg:h-[80vh] items-center">
      <GradientWrapper>
        <div className="lg:w-[70%] h-full flex flex-col lg:flex-row justify-between items-center gap-y-10">
          <div className="flex flex-col gap-y-7 items-center lg:items-start">
            <div className="flex flex-col gap-y-4 items-center lg:items-start">
              <p className="text-3xl md:text-5xl font-bold text-green-600 text-center">
                Payment Successful!
              </p>
              <p className="text-gray-700 text-justify w-[75%] text-sm">
                Thank you for the payment. The credits have been successfully
                added to your account.
              </p>
            </div>
            <div className="flex items-center gap-x-4">
              <Button variant={"default"} asChild>
                <Link href={"/dashboard"}>Go to Dashboard</Link>
              </Button>
              <Button variant={"ghost"} asChild>
                <Link href={"/"}>Back to Home</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <Image
              src={"/success-gif.gif"}
              alt="Success GIF"
              width={400}
              height={200}
              className="rounded-lg shadow shadow-gray-300 w-[90%] md:w-[400px]"
            />
          </div>
        </div>
      </GradientWrapper>
    </section>
  );
};

export default PaymentSuccess;
