"use server";

import sharp from "sharp";

import { decreaseCredits } from "./decrease-credits";

export const compressImage = async (data: FormData) => {
  try {
    const areCreditsDecreased = await decreaseCredits(2);
    if (!areCreditsDecreased) {
      throw new Error("Some error occured. Please try again later!");
    }

    const image = data.get("image")?.valueOf() as File;
    if (image.size * 0.000001 >= 6) {
      throw new Error("Image is too large. Maximum allowed size is 6MB");
    }

    const compressionRatio = data.get("compression-ratio")?.valueOf() as string;
    const type = data.get("type")?.valueOf() as
      | "jpeg"
      | "png"
      | "webp"
      | "avif"
      | "gif";
    const imageArrayBuffer = await image.arrayBuffer();

    const compressedImage = sharp(imageArrayBuffer)
      .withMetadata()
      .png({ compressionLevel: Math.floor(parseFloat(compressionRatio) * 9) });

    let convertedCompressedImage: sharp.Sharp;

    if (type === "jpeg") {
      convertedCompressedImage = compressedImage.jpeg();
    } else if (type === "png") {
      convertedCompressedImage = compressedImage;
    } else if (type === "webp") {
      convertedCompressedImage = compressedImage.webp();
    } else if (type === "avif") {
      convertedCompressedImage = compressedImage.webp();
    } else if (type === "gif") {
      convertedCompressedImage = compressedImage.gif();
    } else {
      throw new Error("Image type not supported");
    }

    const compressedImageBuffer = await convertedCompressedImage!.toBuffer();

    const base64String = Buffer.from(compressedImageBuffer).toString("base64");

    return {
      message: "Image compressed successfully",
      base64String: `data:image/png;base64,${base64String}`,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Some error occured. Please try again later!");
    }
  }
};
