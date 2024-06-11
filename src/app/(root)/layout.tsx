import type { Metadata } from "next";
import "../globals.css";
import Script from "next/script";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AutoImagify",
  description: "Edit your images your way",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
    </>
  );
}
