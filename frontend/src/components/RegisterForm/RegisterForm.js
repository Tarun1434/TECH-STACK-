import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import './RegisterForm.css';

function RegisterForm() {
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleRegister = async () => {
        if (!userId.trim() || !username.trim() || !password.trim()) {
            setError('Please enter all required fields.');
            return;
        }

        try {
            setError('');
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, username, password }),
            });

            const data = await res.json();
            console.log('Server response:', data);

            if (data.success) {
                login(data.user, data.token);
                navigate('/home');
            } else {
                setError(data.message || 'Registration failed.');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setError('Unable to connect to server. Please check if the backend is running.');
        }
    };

    return (
        <div className="registration_container">
            <h1 className="logo">
                Tech <span className="stack-name">Stack</span>
            </h1>
            <div className="registration_form">
                <h2>Register</h2>
                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                <input
                    placeholder="User ID"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    aria-label="User ID"
                />
                <input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    aria-label="Username"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-label="Password"
                />
                <button onClick={handleRegister}>Register</button>
                <p
                    className="link"
                    style={{ cursor: 'pointer', color: 'white', textDecoration: 'underline', textAlign: 'center' }}
                    onClick={() => navigate('/login')}
                >
                    Already registered? Log in here
                </p>
            </div>
        </div>
    );
}

export default RegisterForm;