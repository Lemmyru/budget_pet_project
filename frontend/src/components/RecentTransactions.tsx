import React from 'react';

interface Transaction {
    id: number;
    amount: number;
    category: string;
    date: string;
    type: 'income' | 'expense';
    description: string;
}

interface RecentTransactionsProps {
    transactions: Transaction[];
    onDeleteTransaction?: (id: number) => void;
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({
                                                                   transactions,
                                                                   onDeleteTransaction
                                                               }) => {
    return (
        <section className="dashboard__recent">
            <h3>Recent Transactions</h3>
            {transactions.length === 0 ? (
                <p>No transactions yet</p>
            ) : (
                <div className="dashboard__transactions">
                    {transactions.slice(0, 5).map(transaction => (
                        <div key={transaction.id} className="dashboard__transaction">
                            <div className="dashboard__transaction-info">
                                <span className="dashboard__transaction-category">
                                    {transaction.category}
                                </span>
                                <span className="dashboard__transaction-date">
                                    {transaction.date}
                                </span>
                                {transaction.description && (
                                    <span className="dashboard__transaction-description">
                                        {transaction.description}
                                    </span>
                                )}
                            </div>
                            <div className="dashboard__transaction-actions">
                                <span className={`dashboard__transaction-amount ${transaction.type === 'income' ? 'positive' : 'negative'}`}>
                                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                                </span>
                                {onDeleteTransaction && (
                                    <button
                                        className="dashboard__delete-btn"
                                        onClick={() => onDeleteTransaction(transaction.id)}
                                        title="Delete transaction"
                                    >
                                        ×
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default RecentTransactions;