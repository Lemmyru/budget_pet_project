import React from 'react';
import { Link } from 'react-router-dom';

interface DashboardSidebarProps {
    userName: string;
    balance: number;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ userName, balance }) => {
    return (
        <aside className="dashboard__sidebar">
            <div className="dashboard__user-info">
                <h2 className="dashboard__welcome">Welcome, {userName}!</h2>
                <div className="dashboard__balance">
                    <h3>Current Balance</h3>
                    <p className={`dashboard__balance-amount ${balance >= 0 ? 'positive' : 'negative'}`}>
                        ${balance.toFixed(2)}
                    </p>
                </div>
            </div>

            <nav className="dashboard__nav">
                <Link to="/" className="dashboard__nav-link">Main Page</Link>
                <Link to="/profile" className="dashboard__nav-link">My Profile</Link>
            </nav>
        </aside>
    );
};

export default DashboardSidebar;