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

interface ErrorItem {
  field: string;
  message: string;
}

export const handleErrorApi = ({
  error,
  setError,
  duration,
}: {
  error: Error | EntityError | unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  console.log("=== Error Handling Debug ===");
  console.log("Error object:", error);

  // Xử lý lỗi validation từ server (EntityError)
  if (error instanceof EntityError && setError && error.response?.data?.errors) {
    console.log("Handling EntityError");
    (error.response.data.errors as ErrorItem[]).forEach((item: ErrorItem) => {
      setError(item.field, {
        type: "server",
        message: item.message,
      });
    });
    return;
  }

  // Xử lý lỗi từ API
  let errorMessage = "Có lỗi xảy ra, vui lòng thử lại";

  if (typeof error === 'object' && error !== null) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = error as any;
    console.log("Processing error object:", err);
    
    if (err.response?.data?.message) {
      errorMessage = err.response.data.message;
    } else if (err.response?.message) {
      errorMessage = err.response.message;
    } else if (err.message) {
      errorMessage = err.message;
    } else if (err.data?.message) {
      errorMessage = err.data.message;
    }
  }

  console.log("Final error message:", errorMessage);
  
  toast({
    title: "Lỗi",
    description: errorMessage,
    variant: "destructive",
    duration: duration ?? 5000,
  });
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
