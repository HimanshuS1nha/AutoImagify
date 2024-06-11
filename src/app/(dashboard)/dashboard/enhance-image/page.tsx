"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

import { enhanceImage } from "@/actions/enhance-image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useImageDialog } from "@/hooks/useImageDialog";
import { useUser } from "@/hooks/useUser";

const EnhanceImage = () => {
  const { setImage: setEnhancedImage, setIsOpen } = useImageDialog();
  const { user } = useUser();
  const router = useRouter();

  const [image, setImage] = useState<File>();

  const { mutate: handleEnhanceImage, isPending } = useMutation({
    mutationKey: ["enhance-image"],
    mutationFn: async () => {
      if (!image) {
        throw new Error("Please fill in the fields");
      }
      if (user.credits <= 2) {
        router.push("/pricing");
        throw new Error("Inadequate number of credits. Please buy more.");
      }
      if (image.size * 0.000001 >= 6) {
        throw new Error("Image is too large. Maximum allowed size is 6MB");
      }
      const form = new FormData();
      form.append("image", image as File);
      form.append("type", image.type.split("/")[1]);

      return await enhanceImage(form);
    },
    onSuccess: (data) => {
      toast.success(data?.message);
      setEnhancedImage({
        base64: data.base64String,
        name: image?.name as string,
        type: image?.type.split("/")[1] as string,
      });
      setIsOpen(true);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return (
    <section className="h-[90%] lg:h-[80%] w-[90%] lg:w-[80%] bg-white rounded-xl shadow shadow-gray-300 p-8">
      <div className="flex flex-col gap-y-3">
        <div className="flex gap-x-4 items-center">
          <p className="text-xl font-bold">Enhance Image</p>
          <div className="bg-rose-200 py-1.5 px-3 rounded-full flex items-center justify-center">
            <p className="text-xs font-bold text-rose-600">Credits: 2</p>
          </div>
        </div>
        <div className="w-full h-[0.5px] bg-black" />
      </div>

      <form
        className="mt-10 flex flex-col gap-y-7"
        onSubmit={(e) => {
          e.preventDefault();
          handleEnhanceImage();
        }}
      >
        <div className="flex flex-col gap-y-3">
          <Label className="ml-1.5">
            Upload Image{" "}
            <span className="text-xs text-rose-600 font-bold">
              (Max size : 6MB)
            </span>
          </Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setImage(e.target.files[0]);
              }
            }}
          />
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Please wait..." : "Enhance"}
        </Button>
      </form>
    </section>
  );
};

export default EnhanceImage;
