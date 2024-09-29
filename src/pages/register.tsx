import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context';

const Register: React.FC = () => {
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password !== password2) {
            setError("Passwords do not match");
            return;
        }

        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/register/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, first_name: firstName, last_name: lastName, password, password2 }),
        });

        if (response.ok) {
            const data = await response.json();
            login(data.access);
            navigate('/');
        } else {
            const errorData = await response.json();
            setError(errorData.detail || "Registration failed");
        }
    };

    return (
        <div className="container mt-5 d-flex justify-content-center">
            <div className="card p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h2 className="text-center">Register</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleRegister}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="firstName" className="form-label">First Name</label>
                        <input type="text" className="form-control" id="firstName" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="lastName" className="form-label">Last Name</label>
                        <input type="text" className="form-control" id="lastName" value={lastName} onChange={e => setLastName(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password2" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="password2" value={password2} onChange={e => setPassword2(e.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
