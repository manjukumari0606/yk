import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

const HeadersUser = () => {
    const Navigate = useNavigate();
    const [show, setShow] = React.useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('userRole');
        Navigate('/login');
    };

    const userName = localStorage.getItem('userName');
    const userRole = localStorage.getItem('userRole');

    return (
        <>
            <nav className="navbar" style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <b className="navbar-brand" style={{ color: 'rgb(227, 218, 218)', marginRight: '20px', marginLeft: '20px' }}>Product Data</b>
                    <a href='/home' className="navbar-brand1" style={{ textDecoration: 'none', fontWeight: 'bold', color: 'rgb(227, 218, 218)', marginRight: '20px' }}>Home</a>
                </div>
                <button className="btn btn-secondary" type="button" id="logoutButton" style={{  marginRight: '20px' }} onClick={handleShow}>
                    Logout
                </button>
            </nav>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Logout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                   <p><b>Are you sure you want to logout?</b></p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        No
                    </Button>
                    <Button variant="primary" onClick={handleLogout}>
                        Yes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default HeadersUser;
