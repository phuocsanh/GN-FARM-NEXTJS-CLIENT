import React from "react";
import { FaFacebook, FaInstagramSquare, FaLinkedin } from "react-icons/fa";
import Img from "./Img";
const listPaymentMethods = [
  { icon: "/assets/img_visa.png" },
  { icon: "/assets/img_mastercard.png" },
  { icon: "/assets/img_jcb.png" },
  { icon: "/assets/img_gop.png" },
  { icon: "/assets/img_cod.png" },
];

const listDeliveryMethods = [
  { icon: "/assets/img_delivery_spx.png" },
  { icon: "/assets/img_delivery_vietnam_post.png" },
  { icon: "/assets/img_delivery_viettel.png" },
];
export default function Footer() {
  return (
    <footer className="bg-bg_green w-full py-10 px-4 md:px-10">
      <section className="w-full flex flex-wrap gap-8 justify-between">
        {/* Customer Service */}
        <div className="w-full md:w-[40%] lg:w-[20%]">
          <h1 className="font-semibold">DỊCH VỤ KHÁCH HÀNG</h1>
          {[
            "Hướng Dẫn Mua Hàng/Đặt Hàng",
            "Đơn Hàng",
            "Hướng Dẫn Bán Hàng",
            "Trả Hàng/Hoàn Tiền",
            "Liên Hệ SQ",
            "Chính Sách Bảo Hành",
          ].map((text, idx) => (
            <p
              key={idx}
              className="text-sm mt-2 cursor-pointer hover:text-primary"
            >
              {text}
            </p>
          ))}
        </div>

        {/* About SQ-Ecommerce */}
        <div className="w-full md:w-[40%] lg:w-[20%]">
          <h1 className="font-semibold">Về SQ-ECOMMERCE</h1>
          {[
            "Tuyển Dụng",
            "Điều Khoản SQ",
            "Chính Sách Bảo Mật",
            "Flash Sale",
            "Tiếp Thị Liên Kết",
            "Liên Hệ Truyền Thông",
          ].map((text, idx) => (
            <p
              key={idx}
              className="text-sm mt-2 cursor-pointer hover:text-primary"
            >
              {text}
            </p>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="w-full md:w-[40%] lg:w-[20%]">
          <h1 className="font-semibold">THANH TOÁN</h1>
          <div className="flex flex-row flex-wrap mt-2 gap-3">
            {listPaymentMethods.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded px-2 py-1 shadow-sm w-[50px] h-[22px]"
              >
                <Img alt="payment_method.png" src={item.icon} />
              </div>
            ))}
          </div>
          <h1 className="font-semibold mt-4">ĐƠN VỊ VẬN CHUYỂN</h1>
          <div className="flex flex-row flex-wrap mt-2 gap-3">
            {listDeliveryMethods.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded px-2 py-1 shadow-sm w-[50px] h-[22px]"
              >
                <Img alt="delivery_method.png" src={item.icon} />
              </div>
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div className="w-full md:w-[40%] lg:w-[20%]">
          <h1 className="font-semibold">THEO DÕI</h1>
          {[
            {
              icon: <FaFacebook className="text-slate-500" />,
              name: "Facebook",
            },
            {
              icon: <FaInstagramSquare className="text-slate-500" />,
              name: "Instagram",
            },
            {
              icon: <FaLinkedin className="text-slate-500" />,
              name: "LinkedIn",
            },
          ].map((item, idx) => (
            <button key={idx} className="flex items-center mt-2">
              {item.icon}
              <p className="text-sm ml-1 cursor-pointer hover:text-primary">
                {item.name}
              </p>
            </button>
          ))}
        </div>
      </section>
    </footer>
  );
}
