import Image from "next/image";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import GradientWrapper from "@/components/GradientWrapper";

export default function Home() {
  return (
    <main className="flex flex-col xl:flex-row justify-center xl:h-[80vh] items-center gap-x-12 gap-y-10 xl:gap-y-0">
      <GradientWrapper>
        <div className="flex flex-col gap-y-6 w-[90%] md:w-[60%] lg:w-[45%] items-center xl:items-start mt-8 xl:mt-0">
          <div className="bg-gray-100 border border-gray-200 rounded-full px-4 py-2 shadow-sm shadow-gray-300 w-fit">
            <p className="text-sm font-semibold">AutoImagify is now public</p>
          </div>
          <h1 className="text-5xl font-bold text-center xl:text-left">
            Edit your Image your way
          </h1>
          <p className="text-justify leading-7">
            Experience the ultimate solution for all your image needs with our
            versatile conversion, resizing, compression, and enhancing app.
            Whether you&apos;re converting formats, resizing for different
            platforms, compressing for faster loading times, or enhancing
            details for maximum impact, AutoImagify has you covered. Seamlessly
            navigate through an array of powerful tools designed to streamline
            your workflow and optimize your images with precision.
          </p>
          <div>
            <Button asChild>
              <Link href={"/login"}>Try now</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-between w-[95%] sm:w-[80%] lg:w-[55%] xl:w-[32%] 2xl:w-[40%] relative mb-8 xl:mb-0">
          <Image
            src={"/heroimage.webp"}
            width={250}
            height={250}
            alt="Hero Image"
            className="blur-[1.75px] rounded-md w-[125px] sm:w-[175px] md:w-[250px] xl:w-[175px] 2xl:w-[250px]"
          />
          <MdOutlineArrowRightAlt
            className="absolute left-[45%] top-[40%]"
            color="black"
            size={50}
          />
          <Image
            src={"/heroimage.webp"}
            width={250}
            height={250}
            alt="Hero Image"
            className="rounded-md w-[125px] sm:w-[175px] md:w-[250px] xl:w-[175px] 2xl:w-[250px]"
          />
        </div>
      </GradientWrapper>
    </main>
  );
}
