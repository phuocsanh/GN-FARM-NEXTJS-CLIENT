"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { MdArrowBack } from "react-icons/md";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  RegisterEmail,
  RegisterEmailType,
  RegisterPassword,
  RegisterPasswordType,
  RegisterVerifyOTP,
  RegisterVerifyOTPType,
} from "@/schemaValidations/auth.schema";
import { handleErrorApi, isServerResponseError } from "@/lib/utils";
import { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import Link from "next/link";
import {
  useRegisterEmailMutation,
  useUpdatePassRegisterMutation,
  useVerifyOTPMutation,
} from "@/tanstack-queries/use-auth";
import { API_CODE } from "@/models/common";
import Btn from "@/app/components/Btn";
import Img from "@/app/components/Img";
type Steps = 1 | 2 | 3 | undefined;

const RegisterForm = () => {
  const [step, setStep] = useState<Steps>(undefined);
  const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>("");

  const registerEmailMutation = useRegisterEmailMutation();
  const form = useForm<RegisterEmailType>({
    resolver: zodResolver(RegisterEmail),
    defaultValues: {
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmitEmail(values: RegisterEmailType) {
    try {
      if (registerEmailMutation.isPending) return;
      const result = await registerEmailMutation.mutateAsync({
        email: values.email || "",
      });
      if (API_CODE.SUCCESS === result.code) {
        setEmail(values.email);
        setStep(1);
      } else {
        handleErrorApi({
          error: result.message || "Lỗi không xác định ",
        });
      }
    } catch (error) {
      handleErrorApi({
        error: isServerResponseError(error) ? error.statusText : null,
      });
    }
  }
  return (
    <>
      {!step ? (
        <section className="bg-[rgba(255,255,255,0.9)] w-96 h-96 flex items-center px-10 rounded-sm">
          <article className="w-full">
            <h1 className="text-center font-bold text-lg mb-5">Email</h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmitEmail)}
                className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
                noValidate
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Nhập email"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-600 font-light" />
                    </FormItem>
                  )}
                />

                <Btn
                  title="Tiếp theo"
                  type="submit"
                  isLoading={registerEmailMutation.isPending}
                  disabled={registerEmailMutation.isPending}
                />
              </form>
            </Form>
          </article>
        </section>
      ) : step === 1 ? (
        <InputOTPPattern setStep={setStep} email={email} setToken={setToken} />
      ) : step === 2 ? (
        <CreatePass setStep={setStep} token={token} />
      ) : (
        <SuccessRegister />
      )}
    </>
  );
};

function InputOTPPattern({
  setToken,
  setStep,
  email = "",
}: {
  setToken: (token: string) => void;
  setStep: (step: Steps) => void;
  email: string;
}) {
  const verifyOTPMutation = useVerifyOTPMutation();
  const form = useForm<RegisterVerifyOTPType>({
    resolver: zodResolver(RegisterVerifyOTP),
    defaultValues: {
      verify_code: "",
      verify_key: email,
    },
  });

  async function onSubmitOTP(values: RegisterVerifyOTPType) {
    if (verifyOTPMutation.isPending) return;
    try {
      const result = await verifyOTPMutation.mutateAsync({
        verify_code: values.verify_code,
        verify_key: values.verify_key,
      });

      if (API_CODE.SUCCESS === result.code && result.data.token) {
        setToken(result.data.token);
        setStep(2);
      } else {
        handleErrorApi({
          error: result.message || "Lỗi không xác định ",
          setError: form.setError,
        });
      }
    } catch (error) {
      handleErrorApi({
        error: isServerResponseError(error) ? error.statusText : null,
      });
    }
  }
  return (
    <section className="bg-white w-96 h-96 flex items-center px-10 rounded-sm">
      <article className="w-full">
        <Form {...form}>
          <div className="flex flex-col items-center">
            <button className="self-start" onClick={() => setStep(undefined)}>
              <MdArrowBack size={25} />
            </button>
            <p className="text-lg text-center font-bold">Nhập mã xác thực</p>
            <p className="text-center">Mã xác thực sẽ được gửi qua email</p>
            <div className="mt-8">
              <form onSubmit={form.handleSubmit(onSubmitOTP)}>
                <FormField
                  control={form.control}
                  name="verify_code"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOTP
                          maxLength={6}
                          {...field}
                          pattern={REGEXP_ONLY_DIGITS}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>

                      <FormMessage className="text-red-600 font-light" />
                    </FormItem>
                  )}
                />
                <p className="text-center mt-6">
                  Bạn vẫn chưa nhận được?{" "}
                  <button onClick={() => {}}>
                    <p className="text-cyan-500">Gửi lại</p>
                  </button>
                </p>
                <Btn
                  title="Tiếp theo"
                  type="submit"
                  isLoading={verifyOTPMutation.isPending}
                  disabled={verifyOTPMutation.isPending}
                />
              </form>
            </div>
          </div>
        </Form>
      </article>
    </section>
  );
}

function CreatePass({
  setStep,
  token,
}: {
  setStep: (step: Steps) => void;
  token: string;
}) {
  const updatePassRegisterMutation = useUpdatePassRegisterMutation();

  const form = useForm<RegisterPasswordType>({
    resolver: zodResolver(RegisterPassword),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterPasswordType) {
    try {
      if (updatePassRegisterMutation.isPending) return;
      const result = await updatePassRegisterMutation.mutateAsync({
        user_password: values.password,
        user_token: token,
      });
      if (API_CODE.SUCCESS === result.code) {
        setStep(3);
      } else {
        handleErrorApi({
          error: result.message || "Lỗi không xác định ",
        });
      }
    } catch (error) {
      handleErrorApi({
        error: isServerResponseError(error) ? error.statusText : null,
      });
    }
  }
  return (
    <section className="bg-white w-96 h-96 flex items-center px-10 rounded-sm">
      <article className="w-full">
        <p className="text-lg text-center font-bold">Tạo mật khẩu</p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 max-w-[600px] flex-shrink-0 w-full"
            noValidate
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập mật khẩu"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage
                    content={form.formState.errors.confirmPassword?.message}
                    className="text-red-600 font-light"
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nhập lại mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Nhập lại mật khẩu"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage
                    content={form.formState.errors.confirmPassword?.message}
                    className="text-red-600 font-light"
                  />
                </FormItem>
              )}
            />

            <Btn
              title="Xác nhận"
              type="submit"
              isLoading={updatePassRegisterMutation.isPending}
              disabled={updatePassRegisterMutation.isPending}
            />
          </form>
        </Form>
      </article>
    </section>
  );
}

function SuccessRegister() {
  return (
    <section className="bg-white w-96 h-96 flex items-center px-10 rounded-sm">
      <article className="w-full">
        <Player
          autoplay
          loop
          src="/assets/Success.json"
          style={{ height: "70%", width: "50%" }}
        >
          {/* <Controls visible={true} buttons={["repeat"]} /> */}
        </Player>
        <p className="mt-5 font-light text-center">
          Chúc mừng bạn đã đăng kí tài khoản thành công!
        </p>
        <Link className="w-full" href={"/login"}>
          <Button className="mt-10 w-full text-white cursor-pointer ">
            Đến trang đăng nhập
          </Button>
        </Link>
      </article>
    </section>
  );
}

export default RegisterForm;
