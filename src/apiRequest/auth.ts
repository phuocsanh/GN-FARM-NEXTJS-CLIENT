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
    http.post<ResponseData<LoginResType>>("v1/api/auth/login", body),
  cLogin: (body: LoginBodyType) => {
    return http.post<ResponseData<LoginResType>>("/api/auth/login", body, {
      baseUrl: "",
    });
  },
  registerEmail: (body: RegisterEmailType) => {
    return http.post<ResponseData<null>>("v1/api/auth/registerEmail", body);
  },
  verifyOTP: (body: RegisterVerifyOTPType) => {
    return http.post<ResponseData<VerifyOTPType>>(
      "v1/api/auth/verifyOtp",
      body
    );
  },
  updatePassRegister: (body: UpdatePassBodyType) => {
    return http.post<ResponseData<UpdatePassType>>(
      "v1/api/auth/updatePassRegister",
      body
    );
  },
};
export default authApiRequest;
