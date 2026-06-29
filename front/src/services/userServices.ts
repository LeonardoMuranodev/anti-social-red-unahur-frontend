import type { User } from "../interfaces/auth";

const API_URL = import.meta.env.VITE_API_URL;

export const getUsers = async (): Promise<User[]> => {
    try {
        const response = await fetch(`${API_URL}/usuarios`);
        
        if (!response.ok) {
            throw new Error("Error al obtener los usuarios");
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Hubo un problema con la petición:", error);
        return [];
    }
}

export const loginUser = async (nickname: string, password: string) => {
    const response = await fetch(`${API_URL}/usuarios/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, password }) 
    });

    console.log(response)

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || "Error al iniciar sesión");
    }
    return await response.json();
};

export const registerUser = async (nickname: string, password: string) => {
    const response = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname, password }) 
    });

    console.log(response)

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || "Error al iniciar sesión");
    }
    return await response.json();
};