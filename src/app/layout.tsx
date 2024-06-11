import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import QueryProvider from "@/providers/QueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AutoImagify",
  description:
    "Experience the ultimate solution for all your image needs with our versatile conversion, resizing, compression, and enhancing app. Whether you're converting formats, resizing for different platforms, compressing for faster loading times, or enhancing details for maximum impact, our app has you covered. Seamlessly navigate through an array of powerful tools designed to streamline your workflow and optimize your images with precision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <Toaster />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
