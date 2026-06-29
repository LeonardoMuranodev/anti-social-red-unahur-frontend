import { useContext } from "react";
import { AuthContextGlobal } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";


export default function ProtectedRoute() {

    const {isAuthenticated} = useContext(AuthContextGlobal)

    if (!isAuthenticated) {
        return <Navigate to="/welcome" replace />;
    }

    return <Outlet />;
}