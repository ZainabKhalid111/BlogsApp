import { Navigate, useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem('authToken'); // Example using localStorage for authentication

    if (!isAuthenticated) {
        // If the user is not authenticated, redirect to login
        console.log("not authenticated")
        return (navigate('/'));
    }

    // If authenticated, render the protected element (Blogs page)
    return element;
};


export default ProtectedRoute