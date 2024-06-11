import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { IoMenuOutline } from "react-icons/io5";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

const TopBar = () => {
  return (
    <header className="flex justify-between px-4 lg:px-9 h-[8vh] items-center">
      <p className="text-3xl font-semibold">
        Auto<span className="text-blue-600">Imagify</span>
      </p>
      <div className="flex gap-x-4 lg:gap-x-6 items-center">
        <Link href={"https://linkedin.com/in/himanshu-sinha-b4a884236"}>
          <FaLinkedin
            color="gray"
            className="hover:fill-black hover:scale-110 delay-75 transition-all cursor-pointer"
            size={24}
            target="__blank"
          />
        </Link>
        <Link href={"https://github.com/HimanshuS1nha"}>
          <FaGithub
            color="gray"
            className="hover:fill-black hover:scale-110 delay-75 transition-all cursor-pointer"
            size={24}
            target="__blank"
          />
        </Link>

        <Sheet>
          <SheetTrigger className="block lg:hidden">
            <IoMenuOutline color="black" size={30} />
          </SheetTrigger>
          <SheetContent>
            <Sidebar show />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default TopBar;
