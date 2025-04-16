import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import './LoginForm.css'

function LoginForm() {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        if (!userId.trim() || !password.trim()) {
            setError('Please enter User ID and password.');
            return;
        }

        try {
            setError('');
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, password }),
            });

            const data = await res.json();
            console.log('Server response:', data);

            if (data.success) {
                login(data.user, data.token);
                navigate('/home');
            } else {
                setError(data.message || 'Login failed.');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Unable to connect to server. Please check if the backend is running.');
        }
    };

    return (
        <div className="login_container">
            <h1 className="logo">
                Tech <span className="stack-name">Stack</span>
            </h1>
            <div className="login_form">
                <h2>Login</h2>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <input
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    aria-label="User ID"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-label="Password"
                />
                <button onClick={handleLogin}>Login</button>
                <p
                    className="link"
                    style={{ cursor: 'pointer', color: 'white', textDecoration: 'underline', textAlign: 'center' }}
                    onClick={() => navigate('/')}
                >
                    Don’t have an account? Register here
                </p>
            </div>
        </div>
    );
}

export default LoginForm;