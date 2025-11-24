import React, { useState, useEffect } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardStats from '../components/DashboardStats';
import AddTransactionForm from '../components/AddTransactionForm';
import RecentTransactions from '../components/RecentTransactions';
import { transactionService, type Transaction, type CreateTransactionDto } from '../services/transaction.api';
import { userService, type User } from '../services/user.api';
import { AuthService } from '../services/api.auth';
import {Link} from "react-router-dom";
import { useNavigate, Navigate } from 'react-router-dom';


const calculateStats = (transactions: Transaction[]) => {
    const totalIncome = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpenses;

    return {
        totalIncome,
        totalExpenses,
        balance
    };
};

const Dashboard = () => {
    const [user, setUser] = useState<User | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [addingTransaction, setAddingTransaction] = useState(false);

    const stats = calculateStats(transactions);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            const userData = await userService.getCurrentUser();
            const transactionsData = await transactionService.getTransactions(userData.id);

            setUser(userData);
            setTransactions(transactionsData);
        } catch (err: any) {
            setError('Failed to load dashboard data');
            console.error('Dashboard loading error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTransaction = async (transactionData: CreateTransactionDto) => {
        try {
            setAddingTransaction(true);
            const userData = await userService.getCurrentUser();
            const newTransaction = await transactionService.createTransaction(userData.id, transactionData);


            setTransactions(prev => [newTransaction, ...prev]);
        } catch (err: any) {
            setError('Failed to add transaction');
            console.error('Transaction creation error:', err);
        } finally {
            setAddingTransaction(false);
        }
    };

    const handleDeleteTransaction = async (id: number) => {
        try {
            const userData = await userService.getCurrentUser();
            await transactionService.deleteTransaction(userData.id, id);


            setTransactions(prev => prev.filter(t => t.id !== id));
        } catch (err: any) {
            setError('Failed to delete transaction');
        }
    };

    if (loading) {
        return (
            <div className="dashboard">
                <div className="dashboard__loading">Loading Dashboard...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard">
                <div className="dashboard__error">
                    {error}
                    <Navigate
                        to="/error"
                        state={{ message: error }}
                        replace
                    />

                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="dashboard">
                <div className="dashboard__error">User not found</div>
            </div>
        );
    }
    const handleLogout = () => {

        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('auth');

        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');

        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';


        window.location.href = '/';

    };

    return (
        <div className="dashboard">
            <DashboardSidebar
                userName={user.name}
                balance={stats.balance}
                handleLogout={handleLogout}
            />

            <main className="dashboard__main">
                <div className="dashboard__header">
                    <h1 className="dashboard__title">Financial Dashboard</h1>
                    <p className="dashboard__subtitle">Manage your budget and track your expenses</p>
                </div>

                <DashboardStats
                    income={stats.totalIncome}
                    expenses={stats.totalExpenses}
                    balance={stats.balance}
                />

                <div className="dashboard__content-grid">
                    <div className="dashboard__form-section">
                        <AddTransactionForm
                            onAddTransaction={handleAddTransaction}
                            loading={addingTransaction}
                        />
                    </div>

                    <div className="dashboard__transactions-section">
                        <RecentTransactions
                            transactions={transactions}
                            onDeleteTransaction={handleDeleteTransaction}
                        />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;