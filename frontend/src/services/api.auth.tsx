import { instance } from "./api.config";

interface LoginData {
    email: string;
    password: string;
}

interface AuthResponse {
    accessToken: string;
    refreshToken?: string;
    user: {
        id: number;
        email: string;
        name: string;
    };
}

export const AuthService = {
    async login(email: string, password: string): Promise<AuthResponse> {
        const loginData: LoginData = { email, password };
        const response = await instance.post<AuthResponse>("/api/login", loginData);
        return response.data;
    },

    async refreshToken(): Promise<{ accessToken: string }> {
        const response = await instance.get<{ accessToken: string }>("/api/refresh");
        return response.data;
    },

    async logout(): Promise<void> {
        await instance.post("/api/logout");
    }
};