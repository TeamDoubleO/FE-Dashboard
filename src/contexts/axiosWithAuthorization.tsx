import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

const axiosWithAuthorization: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_KEYWE_SERVER_URI,
  withCredentials: true,
});

// 요청 인터셉터
axiosWithAuthorization.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 인터셉터
axiosWithAuthorization.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry && originalRequest.url !== "/auth/logout") {
      originalRequest._retry = true;
      console.warn("401 에러 발생하여 엑세스 토큰 재발급 시도");

      try {
        const res = await axios.post(
          "/auth/reissue",
          {},
          {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`
            },
            withCredentials: true,
          }
        );

        const newAccessToken = res.headers["authorization"];
        if (newAccessToken) {
          const tokenValue = newAccessToken.replace("Bearer ", "");
          localStorage.setItem("accessToken", tokenValue);

          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${tokenValue}`;
          console.info("엑세스 토큰 재발급 성공 및 재요청 수행");

          return axiosWithAuthorization(originalRequest); 
        }
        // 엑세스 토큰을 받지 못했을 경우
        return Promise.reject(new Error("새로운 accessToken을 받지 못했습니다."));
      } catch (refreshError) {
        console.error("엑세스 토큰 재발급 실패:", refreshError);
        localStorage.clear(); 
        window.location.href = "/admin/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosWithAuthorization;