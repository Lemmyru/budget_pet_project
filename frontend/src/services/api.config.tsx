import * as axios from "axios";

export const instance = axios.default.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_API_URL || "http://localhost:8000",
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !(originalRequest as any)._isRetry
        ) {
            try {
                (originalRequest as any)._isRetry = true;
                const resp = await instance.get("/auth/refresh");
                localStorage.setItem("token", resp.data.accessToken);
                return instance.request(originalRequest);
            } catch {
                console.log("AUTH ERROR");
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    }
);