
import { AuthContext } from '../Context/Context.jsx';
import React, { useContext, useEffect } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './profile.css';
import GetProducts from './GetProducts.jsx';

const Profile = () => {
    const { user, setUser, setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login', { replace: true });
        }
    }, [user, navigate]);

    const logout = async () => {
        try {
            const res = await axios.post('http://localhost:3000/logout', {}, { withCredentials: true });
            console.log(res.data);
            setUser(null);
            setIsAuthenticated(false);
            navigate('/login', { replace: true });
        } catch (err) {
            console.log(err.response ? err.response.data : err.message);
        }
    }

    if (!user) {
        return (
            <>
                <h2>Redirecting...</h2>
                <a href='/login'>Login</a>
            </>
        );
    }

    return (
        <>
            <nav className="navbar sticky-top bg-body-tertiary">
                <div className="container-fluid d-flex justify-content-between align-items-center">
                    <h1 className="navbar-brand">Logo</h1>
                    <li className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle mx-4" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Manage
                        </a>
                        <ul className="dropdown-menu p-3">
                            <li>{user.fullName}</li>
                            <li><button className="dropdown-item text-primary" onClick={logout}>Log out</button></li>
                        </ul>
                    </li>
                </div>
            </nav>
            <GetProducts />
        </>
    );
};

export default Profile;
