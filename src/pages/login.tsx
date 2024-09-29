import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_API_URL}/token/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            login(data.access);
            navigate('/');
        } else {
            alert('Login failed');
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
