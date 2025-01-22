import { RoleValues } from "@/models/common";
import z from "zod";
export const RegisterVerifyOTP = z.object({
  verify_code: z.string(),
  verify_key: z.string(),
});

export const RegisterEmail = z.object({
  email: z.string().min(1, "Email là bắt buộc").email("Email sai định dạng"),
});

export const RegisterPassword = z
  .object({
    password: z.string().min(8, "Tối thiểu 8 kí tự").max(20, "Tối đa 20 kí tự"),
    confirmPassword: z
      .string()
      .min(8, "Tối thiểu 8 kí tự")
      .max(20, "Tối đa 20 kí tự"),
  })
  .strict()
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterVerifyOTPType = z.TypeOf<typeof RegisterVerifyOTP>;
export type RegisterPasswordType = z.TypeOf<typeof RegisterPassword>;
export type RegisterEmailType = z.TypeOf<typeof RegisterEmail>;

export const RegisterRes = z.object({
  data: z.object({
    token: z.string(),
    expiresAt: z.string(),
    account: z.object({
      id: z.number(),
      name: z.string(),
      email: z.string(),
      role: z.enum(RoleValues),
    }),
  }),
  message: z.string(),
});

export type RegisterResType = z.TypeOf<typeof RegisterRes>;

export const LoginBody = z
  .object({
    email: z.string().email("Email không đúng định dạng"),
    password: z.string().min(6, "Tối thiểu 6 kí tự").max(20, "Tối đa 20 kí tự"),
  })
  .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

export type LoginResType = {
  user: {
    _id: string;
    email: string;
    name: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
};

export const SlideSessionBody = z.object({}).strict();

export type SlideSessionBodyType = z.TypeOf<typeof SlideSessionBody>;

export const SlideSessionRes = RegisterRes;

export type SlideSessionResType = z.TypeOf<typeof SlideSessionRes>;
