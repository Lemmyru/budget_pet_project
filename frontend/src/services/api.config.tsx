import * as axios from "axios";

export const instance = axios.default.create({
    withCredentials: true,
    baseURL: "https://jsonplaceholder.typicode.com/",
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
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            originalRequest &&
            !(originalRequest as any)._isRetry
        ) {
            try {
                (originalRequest as any)._isRetry = true;
                const resp = await instance.get("/api/refresh");
                localStorage.setItem("token", resp.data.accessToken);
                return instance.request(originalRequest);
            } catch {
                console.log("AUTH ERROR");
            }
        }

        return Promise.reject(error);
    }
);