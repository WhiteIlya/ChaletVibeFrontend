import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context';

export const Navbar: React.FC = () => {
    const { isAuthenticated, logout, voted, isAdmin } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img
                        src="/snowboard.png"
                        alt="Snowboard Icon"
                        width="40"
                        height="40"
                        className="me-2"
                    />
                    CHALET VIBE
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="nav nav-pills ms-auto">
                        {!isAuthenticated ? (
                            <>
                                <li className="nav-item me-3">
                                    <Link className="btn btn-success" to="/login">Login</Link>
                                </li>
                                <li className="nav-item me-3">
                                    <Link className="btn btn-primary" to="/register">Register</Link>
                                </li>
                            </>
                        ) : (
                            <>
                                {!voted && (
                                    <li className="nav-item me-3">
                                        <Link className="btn btn-success" to="/choose-chalet">Выбираем Шалешку</Link>
                                    </li>
                                )}
                                <li className="nav-item me-3">
                                    <button className="btn btn-warning" disabled={!voted} onClick={() => window.location.href = '/reactions/results'}>
                                        Результаты
                                    </button>
                                </li>
                                {isAdmin && (
                                    <li className="nav-item me-3">
                                        <Link className="btn btn-info" to="/create-chalet">Создать шале</Link>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};