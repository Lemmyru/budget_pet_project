import { instance } from "./api.config";

export interface Transaction {
    id: number;
    amount: number;
    type: 'income' | 'expense';
    category: string;
    description: string;
    date: string;
    user_id: number;
}

export interface CreateTransactionDto {
    amount: number;
    type: 'income' | 'expense';
    category: string;
    description: string;
    date: string;
}


export const transactionService = {
    async getTransactions(userId: number): Promise<Transaction[]> {
        const response = await instance.get<Transaction[]>(`/users/${userId}/transactions`);
        return response.data;
    },

    async createTransaction(userId: number, data: CreateTransactionDto): Promise<Transaction> {
        const response = await instance.post<Transaction>(`/users/${userId}/transactions`, data);
        return response.data;
    },

    async deleteTransaction(userId: number, id: number): Promise<void> {
        await instance.delete(`/users/${userId}/transactions/${id}`);
    }

};