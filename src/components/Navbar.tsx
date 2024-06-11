"use client";

import Link from "next/link";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useEffect } from "react";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useUser } from "@/hooks/useUser";
import { getUser } from "@/actions/get-user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/actions/logout";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { IoMenuOutline } from "react-icons/io5";

const Navbar = () => {
  const { setUser, user } = useUser();
  const router = useRouter();

  const { mutate: handleGetUser } = useMutation({
    mutationKey: ["get-user"],
    mutationFn: getUser,
    onSuccess: (data) => {
      if (data) {
        setUser(data);
      }
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutate: handleLogout, isPending } = useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
    onSuccess: (data) => {
      toast.success(data.message);
      router.replace("/login");
      setUser({ name: "", email: "", isLoggedIn: false, credits: 0 });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  useEffect(() => {
    if (!user.email) {
      handleGetUser();
    }
  }, [user.email, handleGetUser]);
  return (
    <nav className="flex justify-between lg:justify-around items-center h-[10vh] px-4 md:px-8 lg:px-0">
      <Link href={"/"}>
        <p className="text-xl font-bold">
          Auto<span className="text-blue-600">Imagify</span>
        </p>
      </Link>
      <ul className="hidden lg:flex gap-x-8 items-center">
        <Link
          href={"/"}
          className="hover:text-blue-600 delay-75 transition-all font-semibold"
        >
          Home
        </Link>
        <Link
          href={"/pricing"}
          className="hover:text-blue-600 delay-75 transition-all font-semibold"
        >
          Pricing
        </Link>
        <Link
          href={"/contact-us"}
          className="hover:text-blue-600 delay-75 transition-all font-semibold"
        >
          Contact Us
        </Link>
      </ul>
      <div className="flex gap-x-5">
        {user.isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
                <p className="text-white font-bold text-xl uppercase">
                  {user.name[0]}
                </p>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="focus:bg-blue-600 cursor-pointer focus:text-white"
                onClick={() => router.push("/dashboard")}
              >
                My dashboard
              </DropdownMenuItem>
              <DropdownMenuItem
                className="focus:bg-blue-600 cursor-pointer focus:text-white"
                onClick={() => router.push("/change-user-password")}
              >
                Change password
              </DropdownMenuItem>
              <DropdownMenuItem
                className="focus:bg-rose-500 cursor-pointer focus:text-white"
                onClick={() => handleLogout()}
                disabled={isPending}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <>
            <Button variant={"ghost"} asChild className="hidden lg:block">
              <Link href={"/sign-up"}>Signup</Link>
            </Button>
            <Button asChild>
              <Link href={"/login"}>Login</Link>
            </Button>
          </>
        )}

        <Drawer>
          <DrawerTrigger className="block lg:hidden">
            <IoMenuOutline color="black" size={30} />
          </DrawerTrigger>
          <DrawerContent className="flex flex-col gap-y-5 py-3 items-center">
            <DrawerClose asChild>
              <Link
                href={"/"}
                className="hover:text-blue-600 delay-75 transition-all font-semibold"
              >
                Home
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link
                href={"/pricing"}
                className="hover:text-blue-600 delay-75 transition-all font-semibold"
              >
                Pricing
              </Link>
            </DrawerClose>
            <DrawerClose asChild>
              <Link
                href={"/contact-us"}
                className="hover:text-blue-600 delay-75 transition-all font-semibold"
              >
                Contact Us
              </Link>
            </DrawerClose>
          </DrawerContent>
        </Drawer>
      </div>
    </nav>
  );
};

export default Navbar;
