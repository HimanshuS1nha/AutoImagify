"use server";

import sharp from "sharp";

import { decreaseCredits } from "./decrease-credits";

export const resizeImage = async (data: FormData) => {
  try {
    const areCreditsDecreased = await decreaseCredits(2);
    if (!areCreditsDecreased) {
      throw new Error("Some error occured. Please try again later!");
    }

    const image = data.get("image")?.valueOf() as File;
    if (image.size * 0.000001 >= 6) {
      throw new Error("Image is too large. Maximum allowed size is 6MB");
    }

    const width = data.get("width")?.valueOf() as string;
    const height = data.get("height")?.valueOf() as string;
    const type = data.get("type")?.valueOf() as string;
    const imageArrayBuffer = await image.arrayBuffer();

    const resizedImageBuffer = await sharp(imageArrayBuffer)
      .resize({
        height: parseFloat(height),
        width: parseFloat(width),
      })
      .withMetadata()
      .toBuffer();
    const base64String = Buffer.from(resizedImageBuffer).toString("base64");

    return {
      message: "Image resized successfully",
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
