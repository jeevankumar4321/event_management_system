import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/auth/login', { email, password });
            localStorage.setItem('token', response.data);
            navigate('/events');
        } catch (err) {
            setError('Invalid Credentials. Please try again.');
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
            <div className="card shadow-lg p-4 rounded-3" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4 fw-bold text-primary">Welcome Back</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label text-muted">Email Address</label>
                        <input 
                            type="email" 
                            className="form-control form-control-lg" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label text-muted">Password</label>
                        <input 
                            type="password" 
                            className="form-control form-control-lg" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 btn-lg mb-3">Login</button>
                </form>
                <div className="text-center">
                    <p className="text-muted">Don't have an account? <Link to="/register" className="text-decoration-none">Register</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;