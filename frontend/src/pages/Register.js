import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Requirement: "Users sign up"
            await api.post('/auth/register', formData);
            alert('Registration Successful! Please Login.');
            navigate('/login');
        } catch (err) {
            alert('Registration failed. Email might already be taken.');
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center" style={{ minHeight: '80vh' }}>
            <div className="card shadow-lg p-4 rounded-3" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 className="text-center mb-4 fw-bold text-success">Create Account</h2>
                
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label text-muted">Full Name</label>
                        <input 
                            type="text" 
                            name="name"
                            className="form-control form-control-lg" 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label text-muted">Email Address</label>
                        <input 
                            type="email" 
                            name="email"
                            className="form-control form-control-lg" 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label text-muted">Password</label>
                        <input 
                            type="password" 
                            name="password"
                            className="form-control form-control-lg" 
                            onChange={handleChange} 
                            required 
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 btn-lg mb-3">Sign Up</button>
                </form>
                <div className="text-center">
                    <p className="text-muted">Already have an account? <Link to="/login" className="text-decoration-none">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Register;