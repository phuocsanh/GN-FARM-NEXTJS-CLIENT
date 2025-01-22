import ImageNext, { ImageProps } from "next/image";
import * as React from "react";

export default function Img({
  src,
  alt,
  className = "",
  classNameImg = "",
  ...rest
}: ImageProps & { className?: string; classNameImg?: string }) {
  return (
    <div
      className={className}
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <ImageNext
        alt={alt}
        src={src}
        fill
        className={classNameImg}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        {...rest} // Truyền các thuộc tính khác
      />
    </div>
  );
}
