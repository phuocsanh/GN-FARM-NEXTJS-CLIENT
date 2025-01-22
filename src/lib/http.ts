import envConfig from "@/config";
import { normalizePath } from "@/lib/utils";
import { redirect } from "next/navigation";

type CustomOptions = Omit<RequestInit, "method"> & {
  baseUrl?: string | undefined;
};

// const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;

type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};

export class HttpError extends Error {
  code: number;
  data: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  };
  message: string;
  constructor({
    code,
    data,
    message,
  }: {
    code: number;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
    message: string;
  }) {
    super("Http Error");
    this.code = code;
    this.data = data;
    this.message = message;
  }
}

export class EntityError extends HttpError {
  code: 422;
  data: EntityErrorPayload;
  message: string;
  constructor({
    code,
    data,
    message,
  }: {
    code: 422;
    data: EntityErrorPayload;
    message: string;
  }) {
    super({ code, data, message });
    this.code = code;
    this.data = data;
    this.message = message;
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let clientLogoutRequest: null | Promise<any> = null;
const isClient = typeof window !== "undefined";
const request = async <Response>(
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  url: string,
  options?: CustomOptions | undefined
) => {
  let body: FormData | string | undefined = undefined;
  if (options?.body instanceof FormData) {
    body = options.body;
  } else if (options?.body) {
    body = JSON.stringify(options.body);
  }
  const baseHeaders: {
    [key: string]: string;
  } =
    body instanceof FormData
      ? {}
      : {
          "Content-Type": "application/json",
        };
  if (isClient) {
    const response = await fetch("/api/auth/get-access-token", {
      method: "GET",
    });

    if (response.ok) {
      const { accessToken } = await response.json();
      baseHeaders.Authorization = `Bearer ${accessToken}`;
    }
  }
  // Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ envConfig.NEXT_PUBLIC_API_ENDPOINT
  // Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc chúng ta gọi API đến Next.js Server

  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options.baseUrl;

  const fullUrl = `${baseUrl}/${normalizePath(url)}`;

  let res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  });
  if (!res) {
    if (typeof window !== "undefined") {
      window.location.href = `/error?message=${encodeURIComponent(
        "An error occurred while fetching data."
      )}`;
    } else {
      redirect(`/error?message=${encodeURIComponent("Error")}`);
    }
  }

  let payload: Response;

  // Interceptor là nời chúng ta xử lý request và response trước khi trả về cho phía component
  if (!res.ok) {
    // console.log("🚀 ~ else vào đây 105:");

    // if (res.status === ENTITY_ERROR_STATUS) {
    //   try {
    //     payload = await res.json();
    //   } catch (error) {
    //     throw error;
    //   }
    //   const newData = {
    //     code: res.status,
    //     data: payload,
    //     message: res.statusText,
    //   };
    //   throw new EntityError(
    //     newData as {
    //       code: typeof ENTITY_ERROR_STATUS;
    //       data: EntityErrorPayload;
    //       message: string;
    //     }
    //   );
    // }
    console.log("🚀 ~ res:", res);

    if (res.status === AUTHENTICATION_ERROR_STATUS) {
      const refreshResponse = await fetch(
        "/api/auth/get-access-token-by-refresh-token",
        {
          method: "POST",
        }
      );

      if (refreshResponse.ok) {
        const { accessToken } = await refreshResponse.json();

        // Thực hiện lại request ban đầu với accessToken mới
        baseHeaders.Authorization = `Bearer ${accessToken}`;
        res = await fetch(fullUrl, {
          ...options,
          headers: {
            ...baseHeaders,
            ...options?.headers,
          },
          body,
          method,
        });
      } else {
        if (isClient) {
          if (!clientLogoutRequest) {
            clientLogoutRequest = fetch("/api/auth/logout", {
              method: "POST",
              body: null, // Logout luôn  thành công
              headers: {
                ...baseHeaders,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
              },
            });
            try {
              await clientLogoutRequest;
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
            } finally {
              clientLogoutRequest = null;
              // Redirect to Login có thể lặp vô hạn nếu gọi api 1 nào đó cẩn accessToken vì nó đã bị xóa
              location.href = "/login";
            }
          }
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const accessToken = (options?.headers as any)?.Authorization.split(
            "Bearer "
          )[1];
          redirect(`/logout?accessToken=${accessToken}`);
        }
      }
    } else {
      let data;
      try {
        data = await res.json();
      } catch (error) {
        throw error;
      }
      throw new HttpError({
        code: res.status,
        data: null,
        message: data?.message || res.statusText,
      });
    }
  }

  try {
    payload = await res.json();
  } catch (error) {
    throw error;
  }

  return payload;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  patch<Response>(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    body: any,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("PATCH", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    options?: Omit<CustomOptions, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options });
  },
};

export default http;
