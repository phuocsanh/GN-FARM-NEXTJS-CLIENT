"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema";
import { handleErrorApi, isServerResponseError } from "@/lib/utils";
import { useLoginMutation } from "@/tanstack-queries/use-auth";
import Btn from "@/app/components/Btn";
import { useRouter } from "next/navigation";
const LoginForm = () => {
  const router = useRouter();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(LoginBody),
    defaultValues: {
      password: "",
      email: "",
    },
  });

  const loginMutation = useLoginMutation();

  async function onSubmit(values: LoginBodyType) {
    const res = await loginMutation.mutateAsync({
      email: values.email,
      password: values.password,
    });
    if (res.data?.tokens.accessToken) {
      router.push("/");
    }
    try {
    } catch (error) {
      handleErrorApi({
        error: isServerResponseError(error) ? error.statusText : null,
      });
    }
  }
  return (
    <section className="bg-[rgba(255,255,255,0.9)]  w-96 h-96 flex items-center px-10 rounded-sm">
      <article className="w-full">
        <header>
          <h1 className="text-lg text-center font-bold">Đăng nhập</h1>
        </header>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-full flex-shrink-0 w-full"
            noValidate
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      placeholder="Nhập email của bạn"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 font-light" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="password">Mật khẩu</FormLabel>
                  <FormControl>
                    <Input
                      id="password"
                      placeholder="Nhập mật khẩu"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-600 font-light" />
                </FormItem>
              )}
            />
            <Btn
              title="Xác nhận"
              type="submit"
              isLoading={loginMutation.isPending}
              disabled={loginMutation.isPending}
            />
          </form>
        </Form>
      </article>
    </section>
  );
};

export default LoginForm;
