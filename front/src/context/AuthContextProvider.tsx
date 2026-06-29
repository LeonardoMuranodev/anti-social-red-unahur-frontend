import { useEffect, useState } from "react";
import type { Children, User } from "../interfaces/auth";
import { AuthContextGlobal } from "./AuthContext";

export const AuthContextProvider = ({children}: Children) => {
    const [user, setUser] = useState<User | null>(() => {
        const localData = localStorage.getItem("user-data");
            return localData ? JSON.parse(localData) : null;
        }
    );
    
    useEffect(() => {
        localStorage.setItem("user-data", JSON.stringify(user));
    }, [user]);
    
    const login = (userData: User) => {
        setUser(userData)
    }

    const logout = () => {
        setUser(null)
    }

    const isAuthenticated = user !== null


    return (
        <AuthContextGlobal.Provider value={{user, login, logout, isAuthenticated}}>
            {children}
        </AuthContextGlobal.Provider>
    )
}