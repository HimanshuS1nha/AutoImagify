"use server";

import sharp from "sharp";

import { decreaseCredits } from "./decrease-credits";

export const enhanceImage = async (data: FormData) => {
  try {
    const areCreditsDecreased = await decreaseCredits(2);
    if (!areCreditsDecreased) {
      throw new Error("Some error occured. Please try again later!");
    }

    const type = data.get("type")?.valueOf() as
      | "jpeg"
      | "png"
      | "webp"
      | "avif"
      | "gif";
    const image = data.get("image")?.valueOf() as File;
    if (image.size * 0.000001 >= 6) {
      throw new Error("Image is too large. Maximum allowed size is 6MB");
    }

    const imageArrayBuffer = await image.arrayBuffer();

    const enahncedImage = sharp(imageArrayBuffer)
      .withMetadata()
      .sharpen()
      .modulate({ brightness: 1 });

    let convertedEnhancedImage: sharp.Sharp;

    if (type === "jpeg") {
      convertedEnhancedImage = enahncedImage.jpeg();
    } else if (type === "png") {
      convertedEnhancedImage = enahncedImage.png();
    } else if (type === "webp") {
      convertedEnhancedImage = enahncedImage.webp();
    } else if (type === "avif") {
      convertedEnhancedImage = enahncedImage.webp();
    } else if (type === "gif") {
      convertedEnhancedImage = enahncedImage.gif();
    } else {
      throw new Error("Image type not supported");
    }

    const enahncedImageBuffer = await convertedEnhancedImage!.toBuffer();

    const base64String = Buffer.from(enahncedImageBuffer).toString("base64");

    return {
      message: "Image compressed successfully",
      base64String: `data:image/jpeg;base64,${base64String}`,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Some error occured. Please try again later!");
    }
  }
};
