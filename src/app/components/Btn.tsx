"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import LoadingSpinner from "./LoadingSpinner";
type BtnProps = {
  title: string;
  isLoading?: boolean;
} & React.ComponentProps<typeof Button>;
function Btn({
  title,
  className = "!mt-8 w-full text-white",
  isLoading,
  onClick,
  ...props
}: {
  title: string;
  disabled?: boolean;
  className?: string;
  isLoading?: boolean;
  onClick?: () => void;
} & BtnProps) {
  return (
    <Button className={className} onClick={onClick} {...props}>
      {isLoading ? <LoadingSpinner /> : title}
    </Button>
  );
}

export default Btn;
