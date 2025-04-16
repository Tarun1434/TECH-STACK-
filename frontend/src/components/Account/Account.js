import { useContext } from 'react';
import { AuthContext } from '../AuthContext';
import './Account.css';

const Account = () => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <div className="account-page">Please log in to view your account.</div>;
    }

    return (
        <div className="account-page">
            <h2>Welcome, {user.username}!</h2>
            <p>User ID: {user.userId}</p>
        </div>
    );
};

export default Account;