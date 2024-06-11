import { create } from "zustand";

type UserType = {
  name: string;
  email: string;
  credits: number;
  isLoggedIn: boolean;
};

type StoreType = {
  user: UserType;
  setUser: (user: UserType) => void;
};

export const useUser = create<StoreType>((set) => ({
  user: { email: "", name: "", isLoggedIn: false, credits: 0 },
  setUser: (user) => {
    set({ user });
  },
}));
