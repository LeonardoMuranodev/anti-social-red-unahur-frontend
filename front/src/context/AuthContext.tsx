import { createContext } from "react";
import type { AuthContext } from "../interfaces/auth";

export const AuthContextGlobal = createContext<AuthContext>({} as AuthContext)