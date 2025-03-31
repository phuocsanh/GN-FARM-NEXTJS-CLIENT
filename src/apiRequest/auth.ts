import http from "@/lib/http";
import {
  UpdatePassBodyType,
  UpdatePassType,
  VerifyOTPType,
} from "@/models/auth";
import { ResponseData } from "@/models/common";
import {
  LoginBodyType,
  LoginResType,
  RegisterEmailType,
  RegisterVerifyOTPType,
} from "@/schemaValidations/auth.schema";

const authApiRequest = {
  sLogin: (body: LoginBodyType) =>
    http.post<ResponseData<LoginResType>>("api/v1/user/login", body),
  cLogin: (body: LoginBodyType) => {
    return http.post<ResponseData<LoginResType>>("/api/auth/login", body, {
      baseUrl: "",
    });
  },
  registerEmail: (body: RegisterEmailType) => {
    return http.post<ResponseData<null>>("api/v1/user/register", body);
  },
  verifyOTP: (body: RegisterVerifyOTPType) => {
    return http.post<ResponseData<VerifyOTPType>>(
      "api/v1/user/verify-otp",
      body
    );
  },
  updatePassRegister: (body: UpdatePassBodyType) => {
    return http.post<ResponseData<UpdatePassType>>(
      "api/v1/user/update-pass-register",
      body
    );
  },
};
export default authApiRequest;
