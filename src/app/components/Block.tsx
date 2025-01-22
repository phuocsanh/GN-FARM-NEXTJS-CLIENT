import React from "react";

interface BlockProps {
  children: React.ReactNode;
  maxWidth?: number; // Chiều rộng tối đa (mặc định là 1200px)
  className?: string; // Thêm lớp CSS tùy chỉnh
}

const Block: React.FC<BlockProps> = ({
  children,
  maxWidth = 1600,
  className = "",
}) => {
  return (
    <div
      className={`block-container ${className}`}
      style={{
        maxWidth: `${maxWidth}px`,
        width: "100%", // Đảm bảo chiếm hết chiều rộng trên các màn hình nhỏ
        margin: "0 auto", // Canh giữa nội dung
        padding: "0 16px", // Padding ngang
      }}
    >
      {children}
    </div>
  );
};
export default Block;
