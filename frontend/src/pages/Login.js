// src/pages/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/token/', {
                username,
                password,
            });

            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;

            navigate('/');
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <div class='login-page bg-body-secondary'>
            <div class="login-box">
                <div class="login-logo">
                    <a href="#"><b>Admin</b>LTE</a>
                </div>

                <div class="card">
                    <div class="card-body login-card-body">
                        <p class="login-box-msg">Sign in to start your session</p>
                        <form onSubmit={handleLogin}>
                            <div class="input-group mb-3">

                                <input type='text' value={username} class="form-control" onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                                <div class="input-group-text"><span class="bi bi-envelope"></span></div>
                            </div>
                            <div class="input-group mb-3">

                                <input type="password" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                                <div class="input-group-text"><span class="bi bi-lock-fill"></span></div>
                            </div>

                            <div class="row">
                                <div class="col-8">
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                        <label class="form-check-label" for="flexCheckDefault"> Remember Me </label>
                                    </div>
                                </div>

                                <div class="col-4">
                                    <div class="d-grid gap-2">
                                        <button type="submit" class="btn btn-primary">Sign In</button>
                                    </div>
                                </div>

                            </div>

                        </form>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default Login;
