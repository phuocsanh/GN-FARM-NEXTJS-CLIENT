import Img from "@/app/components/Img";
import React from "react";
import HorizontalScroll from "./HorizontalScroll";
import { Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

function Bonsai() {
  const items = Array.from({ length: 10 }).map((_, idx) => (
    <div
      key={idx}
      className=" group relative border-[1px] rounded-md border-primary w-36 h-48  md:w-48 md:h-64 lg:w-64 lg:h-72 bg-red-100 flex-shrink-0 hover:border-[2px]"
    >
      <Dialog>
        <DialogTrigger asChild className="">
          <button className="absolute right-0 top-0 hidden group-hover:block bg-primary rounded-bl-sm p-2">
            <Search className="w-6 h-6 text-white" />
          </button>
        </DialogTrigger>
        <DialogContent className="max-w-none lg:w-[1000px] lg:h-[600px]">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-full">
            {/* Cột 1: Video và danh sách thumbnail */}
            <div className="col-span-1 sm:col-span-2 bg-red-950 grid grid-rows-[3fr_auto] gap-2">
              {/* Video */}
              <iframe
                className="w-full h-[200px] sm:h-full row-span-1"
                src={`https://www.youtube.com/embed/${"GqMMu09aGQA"}`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {/* Thumbnails */}
              <div className="row-span-1 overflow-x-auto">
                <HorizontalScroll>
                  {Array.from({ length: 10 }).map((_, idx) => (
                    <div key={idx} className="w-32 h-32 mt-2 flex-shrink-0">
                      <Img
                        alt=""
                        src={`https://img.youtube.com/vi/GqMMu09aGQA/hqdefault.jpg`}
                      />
                    </div>
                  ))}
                </HorizontalScroll>
              </div>
            </div>

            {/* Cột 2: Nội dung bên phải */}
            <div className="col-span-1 bg-red-600 p-4">
              {/* Thêm nội dung ở đây nếu cần */}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  ));
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-5 mt-8 max-w-full py-4">
      {/* div hình */}
      <div className="w-full  h-[170px]  sm:w-[300px] sm:h-[400px] md:w-[300px]  md:h-[400px] rounded-sm">
        <Img
          classNameImg="rounded-sm"
          alt=""
          fill
          src={
            "https://assets2.htv.com.vn/Images/.NEWZ%202024/FEB/3/6h/MAI%20VANG%203.jpg"
          }
        />
      </div>

      <div className="grid grid-rows gap-2 w-full pr-4">
        <div className="grid grid-cols-[auto_1fr_auto] items-center">
          <h1 className="font-bold text-[20px] text-primary">Cây cảnh</h1>
          <div className="w-8 h-8 ml-2">
            <Img src={"/assets/bonsai.png"} alt="leaf" />
          </div>
          <span className="text-lg cursor-pointer animate-blink">
            Xem tất cả
          </span>
        </div>

        {/* Đường kẻ phân cách */}
        <div className="h-[1px] bg-primary"></div>

        {/* Cuộn ngang */}
        <HorizontalScroll>{items}</HorizontalScroll>
      </div>
    </div>
  );
}

export default Bonsai;
