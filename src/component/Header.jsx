import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';


const Header = () => {

    const Navigate = useNavigate();

    const [show, setShow] = React.useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleLogout = () => {
        // Clear authentication status in local storage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('authToken'); // Remove the auth token
        localStorage.removeItem('user'); // Remove the user information
        localStorage.removeItem('userRole'); // Remove the user role


        // Redirect to the login page
        Navigate('/login');
    };

    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');

    return (
        <>
            <nav className="navbar" >
                <div className="container-fluid">
                    <a href='/product' className="navbar-brand1" style={{ marginLeft: '20px', textDecoration: 'none', fontWeight: 'bold', color: 'rgb(227, 218, 218)' }} id="a2">
                        Product
                    </a>
                    <div className="ms-auto d-flex align-items-center">
                        
                        <Button className="btn btn-secondary" onClick={handleShow}>
                            Logout
                        </Button>
                    </div>
               
                </div>
            </nav>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p> <b>Are you sure you want to logout?</b></p>
                </Modal.Body>                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleLogout}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Header