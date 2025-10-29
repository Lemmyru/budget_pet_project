import React from 'react';

interface DashboardStatsProps {
    income: number;
    expenses: number;
    balance: number;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ income, expenses, balance }) => {
    return (
        <div className="dashboard__stats">
            <div className="dashboard__stat-card income">
                <h3>Total Income</h3>
                <p className="dashboard__stat-amount positive">+${income.toFixed(2)}</p>
            </div>
            <div className="dashboard__stat-card expenses">
                <h3>Total Expenses</h3>
                <p className="dashboard__stat-amount negative">-${expenses.toFixed(2)}</p>
            </div>
            <div className="dashboard__stat-card balance">
                <h3>Net Balance</h3>
                <p className={`dashboard__stat-amount ${balance >= 0 ? 'positive' : 'negative'}`}>
                    ${balance.toFixed(2)}
                </p>
            </div>
        </div>
    );
};

export default DashboardStats;