import {instance} from "./api.config";

interface LoginData {
    email: string;
    password: string;
}

interface AuthResponse {
    access_token: string;
    id: number;
    email: string;
    name: string;

}

export const AuthService = {
    async login(email: string, password: string): Promise<AuthResponse> {
        const loginData: LoginData = { email, password };
        const response = await instance.post<AuthResponse>("/auth/login", loginData);
        return response.data;
    },

    async register(name: string, email: string, password: string): Promise<AuthResponse> {
        const registerData = { name, email, password };
        const response = await instance.post<AuthResponse>("/auth/register", registerData);
        return response.data;
    },

    async refreshToken(): Promise<{ access_token: string }> {
        const response = await instance.get<{ access_token: string }>("/auth/refresh");
        return response.data;
    },

    async logout(): Promise<void> {
        await instance.post("/auth/logout");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
    }
};