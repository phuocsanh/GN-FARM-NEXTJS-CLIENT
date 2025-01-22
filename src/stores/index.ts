import { create } from "zustand";
import { persist } from "zustand/middleware";
import persistStorage from "./persistStorage";

type Store = {
  isLogin?: boolean;
};

export const useAppStore = create<Store>()(
  persist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (_set, _get) => ({
      isLogin: false,
    }),
    {
      name: "app-storage",
      storage: persistStorage,
      partialize: (state) => ({
        // Các trường sẽ được lưu lại sau khi reload app
        isLogin: state.isLogin,
      }),
    }
  )
);
