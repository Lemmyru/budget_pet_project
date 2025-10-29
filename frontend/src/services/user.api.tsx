import { instance } from './api.config';

export interface User {
    id: number;
    email: string;
    name: string;
}

export const userService = {
    async getCurrentUser(): Promise<User> {

        await new Promise(resolve => setTimeout(resolve, 500));

        return {
            id: 1,
            email: 'user@example.com',
            name: 'Demo User'
        };

       /* const response = await instance.get<User>('/api/user/me');
        return response.data;
*/

    },

    async updateUser(userData: Partial<User>): Promise<User> {
        await new Promise(resolve => setTimeout(resolve, 500));

        return {
            id: 1,
            email: userData.email || 'user@example.com',
            name: userData.name || 'Demo User'
        };


      /*  const response = await instance.put<User>('/api/user/profile', userData);
        return response.data;*/
    }
};