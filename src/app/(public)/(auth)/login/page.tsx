import LoginForm from "./login-form";
import { lazy } from "react";
import Img from "@/app/components/Img";

export default function Login() {
  return (
    <div className="h-[calc(100vh-60px)] w-full flex flex-col mt-5">
      {/* Header Section */}
      <header className=" w-full h-[500px] relative flex flex-col lg:mt-10 justify-center">
        {/* Left Content */}
        <aside className="h-full hidden lg:flex w-full">
          <Img
            src={
              "https://bizweb.dktcdn.net/100/485/131/themes/906771/assets/slider_1.jpg?1710378366461"
            }
            alt="a"
          />
        </aside>

        {/* Right Content */}
        <main className="right-20 absolute z-10 top-auto">
          <LoginForm />
        </main>
      </header>
    </div>
  );
}
