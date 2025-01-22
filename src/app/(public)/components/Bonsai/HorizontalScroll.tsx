"use client"; // Đánh dấu đây là Client Component

import React, { useEffect, useRef } from "react";

const HorizontalScroll = ({ children }: { children: React.ReactNode }) => {
  const asideRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const aside = asideRef.current;
    if (!aside) return;

    const handleWheel = (e: WheelEvent) => {
      const isHorizontalScrollable = aside.scrollWidth > aside.clientWidth;

      if (isHorizontalScrollable) {
        // Cuộn ngang
        aside.scrollLeft += e.deltaY;

        // Ngăn cuộn dọc
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Thêm sự kiện với `passive: false`
    aside.addEventListener("wheel", handleWheel, { passive: false });

    // Cleanup khi component unmount
    return () => {
      aside.removeEventListener("wheel", handleWheel);
    };
  }, []);
  return (
    <aside
      ref={asideRef}
      className="flex gap-5 w-full min-w-full overflow-x-auto overflow-y-hidden touch-pan-x"
      style={{
        scrollBehavior: "smooth",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </aside>
  );
};

export default HorizontalScroll;
