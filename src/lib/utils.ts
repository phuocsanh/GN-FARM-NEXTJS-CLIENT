import { clsx, type ClassValue } from "clsx";
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { EntityError } from "./http";
import { toast } from "@/hooks/use-toast";
import { ApiResponseError } from "@/models/common";

export const convertCurrency = (data: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(data || 0);
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

export const handleErrorApi = ({
  error,
  setError,
  duration,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  if (error instanceof EntityError && setError) {
    error.data.errors.forEach((item) => {
      setError(item.field, {
        type: "server",
        message: item.message,
      });
    });
  } else {
    toast({
      title: "Lỗi",
      description: error ?? "Lỗi không xác định",
      variant: "destructive",
      duration: duration ?? 5000,
    });
  }
};

export const isServerResponseError = (
  err: unknown
): err is ApiResponseError => {
  if (
    err &&
    typeof err === "object" &&
    "statusText" in err &&
    "status" in err
  ) {
    return true;
  }
  return false;
};

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem("accessToken");
};
export const getRefreshTokenFromLocalStorage = () => {
  return localStorage.getItem("refreshToken");
};
