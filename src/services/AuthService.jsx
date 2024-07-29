import axios from 'axios';

const API_BASE_URL = "http://localhost:8080/api";

class AuthService {
    register(user) {
        return axios.post(`${API_BASE_URL}/register`, user);
    }

    login(credentials) {
        return axios.post(`${API_BASE_URL}/authenticate`, credentials)
            .then(response => {
                const { token, user } = response.data; 

                console.log("User object received:", user);

                if (token && user) {
                    console.log("JWT Token received:", token); 
                    localStorage.setItem('authToken', token); 
                    localStorage.setItem('isLoggedIn', 'true'); 
                    localStorage.setItem('userName', `${user.firstName} ${user.lastName} ${user.roles} `); 
                    let roles;
                    if (Array.isArray(user.roles)) {
                        roles = user.roles;
                    } else if (typeof user.roles === 'string') {
                        roles = [user.roles];
                    } else if (typeof user.roles === 'object') {
                        roles = Object.values(user.roles); 
                    }

                    if (roles) {
                        localStorage.setItem('roles', roles.join(',')); 
                    } else {
                        console.error("Roles structure is unknown:", user.roles);
                    }
                    
                } else {
                    console.error("JWT Token or user details not found in the response");
                }
                return response;
            })
            .catch(error => {
                console.error("Login error:", error);
                throw error;
            });
    }

    isAuthenticated() {
        return localStorage.getItem('isLoggedIn') === 'true';
    }

    logout() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        localStorage.removeItem('userRole');
    }
}

export default new AuthService();
