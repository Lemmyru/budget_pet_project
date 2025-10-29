import React, { useState, useEffect } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardStats from '../components/DashboardStats';
import AddTransactionForm from '../components/AddTransactionForm';
import RecentTransactions from '../components/RecentTransactions';
import { transactionService, type Transaction, type CreateTransactionDto, type DashboardStats as StatsType } from '../services/transaction.api';
import { userService, type User } from '../services/user.api';

const Dashboard = () => {
    const [user, setUser] = useState<User | null>(null);
    const [stats, setStats] = useState<StatsType>({
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0
    });
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [addingTransaction, setAddingTransaction] = useState(false);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            setLoading(true);
            const [userData, transactionsData, statsData] = await Promise.all([
                userService.getCurrentUser(),
                transactionService.getTransactions(),
                transactionService.getStats()
            ]);

            setUser(userData);
            setTransactions(transactionsData);
            setStats(statsData);
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
            await transactionService.createTransaction(transactionData);

            const [updatedTransactions, updatedStats] = await Promise.all([
                transactionService.getTransactions(),
                transactionService.getStats()
            ]);

            setTransactions(updatedTransactions);
            setStats(updatedStats);
        } catch (err: any) {
            setError('Failed to add transaction');
            console.error('Transaction creation error:', err);
        } finally {
            setAddingTransaction(false);
        }
    };

    const handleDeleteTransaction = async (id: number) => {
        try {
            await transactionService.deleteTransaction(id);
            const [updatedTransactions, updatedStats] = await Promise.all([
                transactionService.getTransactions(),
                transactionService.getStats()
            ]);

            setTransactions(updatedTransactions);
            setStats(updatedStats);
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
                    <button onClick={loadDashboardData} className="dashboard__retry-btn">
                        Try Again
                    </button>
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

    return (
        <div className="dashboard">
            <DashboardSidebar
                userName={user.name}
                balance={stats.balance}
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