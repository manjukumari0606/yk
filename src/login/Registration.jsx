import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';

const Registration = () => {
    const [name, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); // Importing useNavigate from react-router-dom

    const handleRegister = async (e) => {
        e.preventDefault();

          if (password.length < 5 || password.length > 15) {
            setMessage('Password must be between 5 and 15 characters');
            setTimeout(() => {
                setMessage('');
            }, 3000);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setMessage('Invalid email format');
            setTimeout(() => {
                setMessage('');
            }, 3000);
            return;
        }

        const userDetails = { name,  email, password };
        try {
            const response = await AuthService.register(userDetails);
            if (response.data === 'User registered successfully') {
                setMessage('User registered successfully, now you can able to login'); // Set success message
                setFirstname('');
                setEmail('');
                setPassword('');
                setTimeout(() => {
                    setMessage('');
                }, 3000);
            } else {
                setMessage('Registration failed');
                setFirstname('');
                setEmail('');
                setPassword('');
                setTimeout(() => {
                    setMessage('');
                }, 3000);
            }
        } catch (error) {
            setMessage('Registration failed');
        }
    };

    return (
        <section className="vh-100 d-flex align-items-center" style={{ backgroundColor: '#508bfc', padding: '50px 0' }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card shadow-2-strong rounded-3" style={{ marginTop: '20px', marginBottom: '20px' }}>
                            <div className="card-body p-5 text-center">
                                <h3 className="mb-4">Registration</h3>
                                {message && <div className="alert alert-info">{message}</div>}
                                <form>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="First Name"
                                            value={name}
                                            onChange={(e) => setFirstname(e.target.value)}
                                        />
                                        <label htmlFor="firstName">User Name</label>
                                    </div>
                                    
                                    <div className="form-floating mb-3">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <label htmlFor="email">Email</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input
                                            type="password"
                                            className="form-control"
                                            placeholder="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <label htmlFor="password">Password</label>
                                    </div>
                                    <button className="btn btn-primary btn-lg btn-block" type="submit" onClick={handleRegister}>Register</button>
                                </form>
                                <hr className="my-4" />
                                <p className="text-muted">Already registered? <a href="/login">Login here</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Registration;
