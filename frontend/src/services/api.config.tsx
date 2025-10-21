import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";

interface CustomRequestConfig extends InternalAxiosRequestConfig {
    _isRetry?: boolean;
}

interface TokenResponse {
    accessToken: string;
}

export const instance: AxiosInstance = axios.create({
    withCredentials: true,
    baseURL: "https://jsonplaceholder.typicode.com/",
});

instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const customConfig = config as CustomRequestConfig;
        const token = localStorage.getItem("token");

        if (token && customConfig.headers) {
            customConfig.headers.Authorization = `Bearer ${token}`;
        }

        return customConfig;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    (response: AxiosResponse): AxiosResponse => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomRequestConfig;

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !originalRequest._isRetry
        ) {
            try {
                originalRequest._isRetry = true;

                console.log("Attempting to refresh token...");
                const resp = await instance.get<TokenResponse>("/api/refresh");
                localStorage.setItem("token", resp.data.accessToken);
                console.log("Token refreshed successfully");

                return instance.request(originalRequest);
            } catch (refreshError) {
                console.log("AUTH ERROR: Failed to refresh token");
                localStorage.removeItem("token");
            }
        }

        return Promise.reject(error);
    }
);