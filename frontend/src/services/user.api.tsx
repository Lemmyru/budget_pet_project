import { instance } from "./api.config";

export interface User {
    id: number;
    email: string;
    name: string;
}

export const userService = {
    async getCurrentUser(): Promise<User> {
        const userStr = localStorage.getItem("user");

        if (!userStr || userStr === "undefined" || userStr === "null") {
            throw new Error("User not found in localStorage. Please login first.");
        }

        try {
            return JSON.parse(userStr);
        } catch (error) {
            localStorage.removeItem("user");
            throw new Error("Invalid user data in localStorage");
        }
    }
};

