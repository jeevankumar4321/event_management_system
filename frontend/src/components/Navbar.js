import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5">
            <Link className="navbar-brand" to="/">EventMaster</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ms-auto">
                    {!token ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/events">Events</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/create-event">Create Event</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/my-events">My Bookings</Link>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-danger btn-sm ms-3" onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;