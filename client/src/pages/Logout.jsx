import React, { useContext, useEffect } from 'react';
import { appState } from '../App';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    const { setUser } = useContext(appState);

    useEffect(() => {
        // Clear user state and remove token from localStorage
        localStorage.removeItem('token'); // Remove token to ensure user stays logged out
        localStorage.removeItem('user'); // Remove user data
        setUser(null); // Set user state to null
        navigate('/login'); // Navigate to login page
    }, [navigate, setUser]);

    return null; // No need for UI in the Logout component
}

export default Logout;

