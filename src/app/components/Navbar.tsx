// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BsSearch } from "react-icons/bs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { CreditCard, LifeBuoy, LogOut, Settings, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoMdArrowDropdown, IoMdHome } from "react-icons/io";
import { useAppStore } from "@/stores";
import { useEffect, useRef, useState } from "react";
import { Timeout } from "@/models/common";
import Img from "./Img";
import Block from "./Block";
export default function Navbar() {
  const pathname = usePathname();
  const isAuthenticated = useAppStore((state) => state.isLogin);

  return (
    <nav className="fixed left-0 w-full z-50 h-auto bg-white">
      <Block className="">
        <div className="px-4 sm:px-8 py-4 flex justify-between items-center">
          {/* Logo và Trang chủ */}
          <div className="flex items-center space-x-2">
            <Link
              href="/"
              className="text-sm md:text-lg font-semibold text-primary-foreground text-white truncate flex items-center"
            >
              <span className="sm:hidden">
                <IoMdHome size={30} />
              </span>
              <div className="w-9 h-9">
                <Img
                  alt=""
                  src="https://cdn-icons-png.flaticon.com/128/8044/8044419.png"
                  fill
                />
              </div>
            </Link>
          </div>

          {/* Tìm kiếm - chỉ hiển thị trên màn hình lớn */}
          {/* {pathname === "/" && (
          <div className="hidden sm:flex items-center space-x-2 bg-white w-[50%] sm:w-[60%] md:w-[50%] rounded-sm border-2 border-primary h-10">
            <input
              className="w-full p-1 sm:p-2 rounded border-none bg-white text-sm"
              placeholder="Tìm kiếm..."
            />
            <button className="bg-primary cursor-pointer items-center justify-center h-full px-2">
              <BsSearch className="w-5 sm:w-6 text-lg text-white" />
            </button>
          </div>
        )} */}

          {/* Menu responsive */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 md:w-56 bg-white">
                <DropdownMenuSeparator />
                {isAuthenticated ? (
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard />
                      <span>Billing</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                ) : (
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User />
                      <Link href={"/register"}>Đăng kí</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard />
                      <Link href={"/login"}>Đăng nhập</Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                )}

                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LifeBuoy />
                  <span>Hỗ trợ</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings />
                  <span>Cài đặt</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {isAuthenticated && (
                  <DropdownMenuItem>
                    <LogOut />
                    <span>Đăng xuất</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Menu chính */}
        <div className="bg-primary mx-0 sm:mx-12 mt-auto rounded-sm flex flex-wrap items-center justify-center  py-3  sm:space-y-0 sm:flex-row">
          <Link
            href={"/"}
            className="text-white px-2 md:px4 lg:px-4 font-medium flex items-center"
          >
            Trang chủ
          </Link>
          <div className="cursor-pointer group px-2 md:px4 lg:px-4">
            <span className="text-white items-center flex flex-row font-medium">
              Sản phẩm
              <div className="inline-block transition-transform duration-300 transform group-hover:rotate-180">
                <IoMdArrowDropdown className="text-white w-6 h-6" />
              </div>
            </span>
            <div className="absolute top-full left-0 text-sm rounded px-2 py-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-full"></div>
          </div>
          <Link
            href={"/"}
            className="text-white px-2 md:px4 lg:px-4 font-medium flex items-center"
          >
            Khuyến mãi
          </Link>
        </div>
      </Block>
    </nav>
  );
}
