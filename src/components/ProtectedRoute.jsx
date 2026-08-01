import { Navigate } from "react-router-dom";


export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");

    // if no token, redirect to login page
    if(!token) {
        return <Navigate to="/login" replace />;
    }

    // otherwise, render the children components
    return children;
}