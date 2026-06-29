import type { ReactNode } from "react";

export interface User {
    id: string,
    nickname: string,
    seguidores: string[];
    seguidos: string[];
}

export interface AuthContext {
    user: User,
    login: (userData: User) => void,
    logout: () => void,
    isAuthenticated: boolean
}

export interface Children {
    children: ReactNode;
}