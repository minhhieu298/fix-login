import * as Sentry from "@sentry/nextjs";
import Axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  RawAxiosRequestHeaders,
} from "axios";
import { getCookie } from "cookies-next";

import { IResponseData } from "@/interface/interface";

const MAIN_API_DOMAIN = process.env.NEXT_PUBLIC_NEXT_DOMAIN_GATEWAYS;
const SECONDARY_API_DOMAIN = process.env.NEXT_PUBLIC_NEXT_DOMAIN_MARKETSTREAM;

export const API_URLS = {
  main: {
    base: MAIN_API_DOMAIN,
  },
  secondary: {
    base: SECONDARY_API_DOMAIN,
  },
};

export const mainApiInstance = Axios.create({
  baseURL: API_URLS.main.base,
  // withCredentials: true,
});

// Tạo instance cho Secondary API
export const secondaryApi = Axios.create({
  baseURL: API_URLS.secondary.base,
  // withCredentials: true,
});

export const getJwtToken = () => {
  return (
    getCookie("aspfpt_sessiontoken", {
      domain: ".fpts.com.vn",
      path: "/",
    }) || ""
  ); // Lấy JWT từ cookie, tên key là "jwt"
};

// Interceptor để tự động thêm JWT vào header cho mainApiInstance
mainApiInstance.interceptors.request.use(
  (config) => {
    const token = getJwtToken();
    if (typeof window !== "undefined") {
      config.headers["UserAgent"] = navigator.userAgent;
    }
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// mainApiInstance.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const status = error.response?.status;

//     if (status === 401) {
//       // 1️⃣ Xoá user trong Redux
//       store.dispatch(AuthAction.getUserInfo());

//       // // 2️⃣ Phát sự kiện mở popup login
//       // eventBus.emit("OPEN_LOGIN_POPUP");

//       // 3️⃣ Option: hiện thông báo
//       // console.warn("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại.");
//     }

//     return Promise.reject(error);
//   }
// );

interface ApiCallParams<D> {
  url: string;
  method?: Method;
  data?: D;
  headers?: RawAxiosRequestHeaders;
  axiosConfig?: AxiosRequestConfig<D>;
  returnRawResponse?: boolean;
}

//hàm này cần phải truyền jwt để validate authen cho api
export async function callApi<T, D = object>(
  _params: ApiCallParams<D> & { returnRawResponse: true }
): Promise<AxiosResponse<T>>;
export async function callApi<T, D = object>(
  _params: ApiCallParams<D> & { returnRawResponse?: false }
): Promise<IResponseData<T>>;
export async function callApi<T, D = object>({
  url,
  method = "GET",
  data = {} as D,
  headers,
  axiosConfig,
  returnRawResponse = false,
}: ApiCallParams<D>): Promise<IResponseData<T> | AxiosResponse<T>> {
  try {
    const isFormData =
      typeof FormData !== "undefined" && data instanceof FormData;
    const defaultHeaders: RawAxiosRequestHeaders = isFormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" };
    const mergedHeaders: RawAxiosRequestHeaders = {
      ...defaultHeaders,
      ...(headers ?? {}),
      ...((axiosConfig?.headers as RawAxiosRequestHeaders) ?? {}),
    };
    const response = await mainApiInstance.request<T, AxiosResponse<T>, D>({
      url: url,
      method,
      data,
      ...axiosConfig,
      headers: mergedHeaders,
    });
    if (returnRawResponse) {
      return response;
    }
    return response.data as IResponseData<T>;
  } catch (error) {
    const axiosError = error as AxiosError;
    Sentry.captureException(error);

    // Trường hợp mất mạng
    if (!axiosError.response && axiosError.code === "ERR_NETWORK") {
      return {
        Code: "NETWORK_ERROR",
        Message: "Không thể kết nối đến server. Vui lòng kiểm tra mạng!",
        error: "Network Error",
        Data: null,
      };
    }

    // Trường hợp có response từ server nhưng lỗi (4xx, 5xx)
    if (axiosError.response) {
      const { status } = axiosError.response;
      if (status === 401) {
        return {
          Code: -123456,
          Message: "ACCESS_DENIED",
          Data: null,
        };
      }
      if (status >= 500) {
        return {
          Code: status,
          Message: "Hệ thống đang gặp sự cố. Vui lòng thử lại sau!",
          error: `Server Error: ${status}`,
          Data: null,
        };
      }

      if (status === 401) {
        return {
          Code: -123456,
          Message: "ACCESS_DENIED",
          Data: null,
        };
      }
    }

    // Trường hợp lỗi khác (không xác định)
    return {
      Code: "UNKNOWN_ERROR",
      Message: "Đã xảy ra lỗi. Vui lòng tải lại trang!",
      error: axiosError.message,
      Data: null,
    };
  }
}
