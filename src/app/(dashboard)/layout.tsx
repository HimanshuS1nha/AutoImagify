import type { Metadata } from "next";
import "../globals.css";

import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import ImageDialog from "@/components/ImageDialog";

export const metadata: Metadata = {
  title: "Dashboard | AutoImagify",
  description:
    "Experience the ultimate solution for all your image needs with our versatile conversion, resizing, compression, and enhancing app. Whether you're converting formats, resizing for different platforms, compressing for faster loading times, or enhancing details for maximum impact, our app has you covered. Seamlessly navigate through an array of powerful tools designed to streamline your workflow and optimize your images with precision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col h-full w-full">
      <ImageDialog />
      <TopBar />
      <div className="h-full w-full flex">
        <Sidebar />
        <div className="flex justify-center items-center h-full w-full bg-gray-100">
          {children}
        </div>
      </div>
    </div>
  );
}
