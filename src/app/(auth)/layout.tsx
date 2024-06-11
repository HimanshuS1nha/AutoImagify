import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Auth | AutoImagify",
  description:
    "Experience the ultimate solution for all your image needs with our versatile conversion, resizing, compression, and enhancing app. Whether you're converting formats, resizing for different platforms, compressing for faster loading times, or enhancing details for maximum impact, our app has you covered. Seamlessly navigate through an array of powerful tools designed to streamline your workflow and optimize your images with precision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
