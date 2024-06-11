"use server";

import sharp from "sharp";

import { decreaseCredits } from "./decrease-credits";

export const convertImage = async (data: FormData) => {
  try {
    const areCreditsDecreased = await decreaseCredits(1);
    if (!areCreditsDecreased) {
      throw new Error("Some error occured. Please try again later!");
    }

    const type = data.get("type")?.valueOf() as
      | "jpg"
      | "png"
      | "webp"
      | "avif"
      | "gif";
    const image = data.get("image")?.valueOf() as File;
    if (image.size * 0.000001 >= 6) {
      throw new Error("Image is too large. Maximum allowed size is 6MB");
    }

    const imageArrayBuffer = await image.arrayBuffer();

    let convertedImage: sharp.Sharp;

    if (type === "jpg") {
      convertedImage = sharp(imageArrayBuffer).withMetadata().jpeg();
    } else if (type === "png") {
      convertedImage = sharp(imageArrayBuffer).withMetadata().png();
    } else if (type === "webp") {
      convertedImage = sharp(imageArrayBuffer).withMetadata().webp();
    } else if (type === "avif") {
      convertedImage = sharp(imageArrayBuffer).withMetadata().avif();
    } else if (type === "gif") {
      convertedImage = sharp(imageArrayBuffer).withMetadata().gif();
    } else {
      throw new Error("Image type not supported");
    }

    const convertedImageBuffer = await convertedImage!.toBuffer();

    const base64String = Buffer.from(convertedImageBuffer).toString("base64");

    return {
      message: "Image converted successfully",
      base64String: `data:image/${type};base64,${base64String}`,
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("Some error occured. Please try again later!");
    }
  }
};
