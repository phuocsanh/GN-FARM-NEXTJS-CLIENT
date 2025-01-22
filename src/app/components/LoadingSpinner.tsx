import React from "react";

interface LoadingSpinnerProps {
  size?: string; // Kích thước
  color?: string; // Màu
  // Độ dày viền
  classNameF?: string;
  classNameC?: string; //
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "w-6 h-6",
  color = "white",
  classNameF,
  classNameC,
}) => {
  return (
    <div
      className={`flex justify-center items-center w-full h-full ${classNameF}`}
    >
      <div
        style={{
          border: "2px solid transparent",
          borderTopColor: color,
          borderRightColor: color, // Tăng góc tô màu
        }}
        className={`rounded-full ${size}  animate-spin ${classNameC}`}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
