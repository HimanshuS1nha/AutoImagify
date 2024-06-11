"use client";

import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useImageDialog } from "@/hooks/useImageDialog";
import { Button } from "./ui/button";

const ImageDialog = () => {
  const { image, isOpen, setImage, setIsOpen } = useImageDialog();

  const downloadFile = () => {
    const a = document.createElement("a");
    a.href = image?.base64 as string;
    a.download = `${image?.name?.split(".")[0]}-converted.${image?.type}`;
    a.click();
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        setImage(null as never);
        setIsOpen(false);
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-rose-600">
            {image?.name?.split(".")[0]}-converted.{image?.type}
          </DialogTitle>
          <DialogDescription>
            The image will be gone as soon as you close this dialog.
          </DialogDescription>
        </DialogHeader>
        {image?.base64 && (
          <Image
            src={image?.base64 as string}
            alt="Converted Image"
            width={400}
            height={400}
            className="w-full h-[300px]"
          />
        )}
        <Button onClick={downloadFile}>Download</Button>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
