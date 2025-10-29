import React, { useState } from 'react';

interface TransactionInput {
    amount: string;
    category: string;
    description: string;
    type: 'income' | 'expense';
}

interface AddTransactionFormProps {
    onAddTransaction: (transaction: Omit<TransactionInput, 'amount'> & { amount: number }) => void;
    loading?: boolean;
}

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({
                                                                   onAddTransaction,
                                                                   loading = false
                                                               }) => {
    const [formData, setFormData] = useState<TransactionInput>({
        amount: '',
        category: '',
        description: '',
        type: 'expense'
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.amount || !formData.category || loading) return;

        onAddTransaction({
            ...formData,
            amount: parseFloat(formData.amount)
        });

        setFormData({
            amount: '',
            category: '',
            description: '',
            type: 'expense'
        });
    };

    const handleChange = (field: keyof TransactionInput, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    return (
        <section className="dashboard__add-transaction">
            <h3>Add New Transaction</h3>
            <form onSubmit={handleSubmit} className="dashboard__form">
                <div className="dashboard__form-group">
                    <label>Type:</label>
                    <select
                        value={formData.type}
                        onChange={(e) => handleChange('type', e.target.value)}
                        disabled={loading}
                    >
                        <option value="expense">Expense</option>
                        <option value="income">Income</option>
                    </select>
                </div>

                <div className="dashboard__form-group">
                    <label>Amount:</label>
                    <input
                        type="number"
                        step="0.01"
                        value={formData.amount}
                        onChange={(e) => handleChange('amount', e.target.value)}
                        placeholder="0.00"
                        required
                        disabled={loading}
                    />
                </div>

                <div className="dashboard__form-group">
                    <label>Category:</label>
                    <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => handleChange('category', e.target.value)}
                        placeholder="Food, Salary, etc."
                        required
                        disabled={loading}
                    />
                </div>

                <div className="dashboard__form-group">
                    <label>Description:</label>
                    <input
                        type="text"
                        value={formData.description}
                        onChange={(e) => handleChange('description', e.target.value)}
                        placeholder="Optional description"
                        disabled={loading}
                    />
                </div>

                <button
                    type="submit"
                    className="dashboard__submit-btn"
                    disabled={loading || !formData.amount || !formData.category}
                >
                    {loading ? 'ADDING...' : 'Add Transaction'}
                </button>
            </form>
        </section>
    );
};

export default AddTransactionForm;