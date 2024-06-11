import { create } from "zustand";

type ImageDropdownType = {
  isOpen: boolean;
  image: {
    base64: string;
    name: string;
    type: string;
  } | undefined;
  setIsOpen: (open: boolean) => void;
  setImage: (image: { base64: string; name: string; type: string }) => void;
};

export const useImageDialog = create<ImageDropdownType>((set) => ({
  isOpen: false,
  image: undefined,
  setIsOpen: (open) => set({ isOpen: open }),
  setImage: (image) => set({ image }),
}));
