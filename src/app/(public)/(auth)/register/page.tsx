import RegisterForm from "./register-form";
import Img from "@/app/components/Img";

export default function Register() {
  return (
    <div className="min-h-[calc(100vh-60px)] w-full relative">
      {/* Background Image - Show on all devices */}
      <div className="absolute inset-0 bg-[#f8f9fa]">
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-transparent md:to-transparent">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90 md:to-transparent">
            <Img
              src="https://bizweb.dktcdn.net/100/485/131/themes/906771/assets/slider_1.jpg?1710378366461"
              alt="background"
              className="object-cover opacity-90"
            />
          </div>
        </div>
      </div>

      {/* Form Container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center md:justify-start py-8">
        <div className="w-full md:ml-[10%] lg:ml-[15%] flex justify-center md:justify-start">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
