import { instance } from './api.config';

export interface Transaction {
    id: number;
    amount: number;
    category: string;
    date: string;
    type: 'income' | 'expense';
    description: string;
}

export interface CreateTransactionDto {
    amount: number;
    category: string;
    type: 'income' | 'expense';
    description: string;
}

export interface DashboardStats {
    totalIncome: number;
    totalExpenses: number;
    balance: number;
}

// Примерные начальные данные для заглушки
const mockTransactions: Transaction[] = [
    {
        id: 1,
        amount: 1000,
        category: 'Salary',
        type: 'income',
        date: '2024-01-15',
        description: 'Monthly salary'
    },
    {
        id: 2,
        amount: 150,
        category: 'Food',
        type: 'expense',
        date: '2024-01-16',
        description: 'Groceries'
    }
];

export const transactionService = {
    async getTransactions(): Promise<Transaction[]> {
        // ЗАГЛУШКА
        await new Promise(resolve => setTimeout(resolve, 300));
        return [...mockTransactions];


        // const response = await instance.get<Transaction[]>('/api/transactions');
        // return response.data;
    },

    async createTransaction(transaction: CreateTransactionDto): Promise<Transaction> {

        await new Promise(resolve => setTimeout(resolve, 500));

        const newTransaction: Transaction = {
            ...transaction,
            id: Date.now(),
            date: new Date().toISOString().split('T')[0] // "2024-01-20"
        };


        mockTransactions.unshift(newTransaction);

        return newTransaction;


        // const response = await instance.post<Transaction>('/api/transactions', transaction);
        // return response.data;
    },

    async getStats(): Promise<DashboardStats> {

        await new Promise(resolve => setTimeout(resolve, 200));

        const totalIncome = mockTransactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);

        const totalExpenses = mockTransactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);

        return {
            totalIncome,
            totalExpenses,
            balance: totalIncome - totalExpenses
        };

        // const response = await instance.get<DashboardStats>('/api/transactions/stats');
        // return response.data;
    },

    async deleteTransaction(id: number): Promise<void> {
        await new Promise(resolve => setTimeout(resolve, 300));

        const index = mockTransactions.findIndex(t => t.id === id);
        if (index > -1) {
            mockTransactions.splice(index, 1);
        }


        // await instance.delete(`/api/transactions/${id}`);
    }
};