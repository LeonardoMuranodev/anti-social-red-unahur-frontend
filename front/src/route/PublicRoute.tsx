import { useContext } from "react";
import { AuthContextGlobal } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router";

export default function PublicRoute() {
    const {isAuthenticated} = useContext(AuthContextGlobal)

    if (isAuthenticated) {
        return <Navigate to="/user" replace />;
    }

    return <Outlet />;
}