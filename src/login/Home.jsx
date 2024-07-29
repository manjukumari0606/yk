import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';
import AuthService from '../services/AuthService';

const Home = () => {

    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem('isLoggedIn') === 'true');

    localStorage.removeItem('user'); // Remove the user information
    localStorage.removeItem('userRole');
    const userName = localStorage.getItem('userName');

    return (
        <div>
        {isAuthenticated ? (
            <div className="text-center">
                <Header />
                <h4>Hi Welcome to my Home Page</h4>
               
                <Footer />
            </div>
        ) : (
            <div className="text-center">
                <h1>If you want to visit the home page first you need to login through your credentials...</h1>
            </div>
        )}
    </div>
    );
};

export default Home;
