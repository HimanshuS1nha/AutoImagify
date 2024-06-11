import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-black h-[10vh] flex justify-around items-center text-gray-300">
      <p className="text-sm">
        © {new Date().getFullYear()}. All rights reserved.
      </p>
      <div className="flex gap-x-4 items-center">
        <Link href={"https://linkedin.com/in/himanshu-sinha-b4a884236"}>
          <FaLinkedin
            color="gray"
            size={20}
            className="hover:fill-white delay-75 transition-all cursor-pointer"
            target="__blank"
          />
        </Link>
        <Link href={"https://github.com/HimanshuS1nha"}>
          <FaGithub
            color="gray"
            size={20}
            className="hover:fill-white delay-75 transition-all cursor-pointer"
            target="__blank"
          />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
