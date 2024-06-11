"use client";

import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

import { getUser } from "@/actions/get-user";
import { useUser } from "@/hooks/useUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/actions/logout";
import { useImageDialog } from "@/hooks/useImageDialog";
import { SheetClose } from "@/components/ui/sheet";

const Sidebar = ({ show = false }: { show?: boolean }) => {
  const pathname = usePathname();
  const { user, setUser } = useUser();
  const { image } = useImageDialog();
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

  const sidebar = [
    {
      title: "Convert Image",
      url: "convert-image",
    },
    {
      title: "Enhance Image",
      url: "enhance-image",
    },
    {
      title: "Resize Image",
      url: "resize-image",
    },
    {
      title: "Compress Image",
      url: "compress-image",
    },
  ];

  useEffect(() => {
    if (!user.email || image?.base64) {
      handleGetUser();
    }
  }, [user.email, image?.base64, handleGetUser]);
  return (
    <div
      className={`w-[400px] h-full pt-12 px-9 ${
        show ? "flex" : "hidden"
      } lg:flex flex-col gap-y-8 relative`}
    >
      {show && (
        <p className="text-xl font-bold absolute -top-[1.5%] left-0">
          Auto<span className="text-blue-600">Imagify</span>
        </p>
      )}
      {sidebar.map((item) => {
        return (
          <Link
            href={`/dashboard/${item.url}`}
            className={`text-lg font-semibold ${
              pathname === `/dashboard/${item.url}`
                ? "text-blue-600"
                : "hover:text-blue-600"
            } delay-75 transition-all flex justify-between`}
            key={item.title}
          >
            {show ? <SheetClose>{item.title}</SheetClose> : item.title}
          </Link>
        );
      })}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="absolute bottom-[5%] right-10 lg:right-auto w-[85%] py-2 px-1.5 hover:bg-blue-100 group rounded-full delay-75 transition-all cursor-pointer">
            <div className="flex gap-x-3">
              <div className="bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center">
                <p className="text-white font-bold text-xl uppercase">
                  {user.name[0]}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-bold delay-75 transition-all">
                  {user.name}
                </p>
                <p className="text-gray-700 delay-75 transition-all text-sm">
                  {user.credits} Credits
                </p>
              </div>
            </div>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="focus:bg-blue-600 cursor-pointer focus:text-white"
            onClick={() => router.push("/pricing")}
          >
            Buy more credits
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
    </div>
  );
};

export default Sidebar;
