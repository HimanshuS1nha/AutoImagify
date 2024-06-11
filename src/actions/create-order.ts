"use server";

import Razorpay from "razorpay";

import prisma from "@/lib/db";

export const createOrder = async (amount: number, email: string) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY!,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount,
      currency: "INR",
      receipt: "receipt-123",
    });

    await prisma.payment.create({
      data: {
        orderId: order.id,
        email,
      },
    });

    return { orderId: order.id, amount: order.amount };
  } catch (error) {
    throw new Error("Some error occured. Please try again later!");
  }
};
