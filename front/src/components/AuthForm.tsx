import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { AuthContextGlobal } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { loginUser, registerUser } from "../services/userServices";

interface AuthFormProps {
    tipo: 'login' | 'signup';
}

export default function AuthForm({tipo}: AuthFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorForm, setErrorForm] = useState<string>("");

    const { login } = useContext(AuthContextGlobal);
    const navigate = useNavigate();
    const titleText = tipo == "login" ? "Iniciar Sesión" : "Registrarse"


    const FormSubmit = async (data: any) => {
        setErrorForm(""); 

        try {
            if (tipo === 'login') {
                const user = await loginUser(data.nickname, data.password);
                login(user);
                navigate("/user")
            } else {
                await registerUser(data.nickname, data.password);
                navigate("/login");
            }
        } catch (err: any) {
            setErrorForm(err.message);
        }
    }

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "var(--color-primary-background-darker)" }}>
            <div className="card shadow-lg p-4" style={{ backgroundColor: "transparent", border: "none", width: "100%", maxWidth: "400px" }}>
                <h2 className="text-white mb-4 fw-bold">{titleText}</h2>
                
                <form onSubmit={handleSubmit(FormSubmit)} noValidate>
                    <div className="mb-3">
                        <label htmlFor="nickname" className="form-label text-white fw-semibold">Nickname</label>
                        <input
                            {...register("nickname", { required: true, minLength: 3, pattern: /^[a-zA-Z0-9\s]+$/ })}
                            type="text"
                            className="form-control" 
                            id="nickname"
                            placeholder="Ej: ddd"
                        />
                        <div className="text-warning mt-1" style={{ fontSize: "0.85rem" }}>
                            {errors.nickname?.type === 'required' && "Este campo es obligatorio"}
                            {errors.nickname?.type === 'minLength' && "Mínimo 3 caracteres"}
                            {errors.nickname?.type === 'pattern' && "El nickname es incorrecto"}
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label text-white fw-semibold">Contraseña</label>
                        <input
                            {...register("password", { required: true, minLength: 3 })}
                            type="password"
                            className="form-control" 
                            id="password"
                            placeholder="••••••"
                        />
                        <div className="text-warning mt-1" style={{ fontSize: "0.85rem" }}>
                            {errors.password?.type === 'required' && "Este campo es obligatorio"}
                            {errors.password?.type === 'minLength' && "Mínimo 3 caracteres"}
                        </div>
                    </div>
                    
                    <button type="submit" className="btn btn-primary w-100 fw-bold mb-3" style={{ backgroundColor: "var(--color-primary)", borderColor: "var(--color-primary-light)" }}>
                        Ingresar
                    </button>
                </form>

                {errorForm && (
                    <div className="alert alert-danger text-center" role="alert" style={{ backgroundColor: "var(--color-primary-background-lighter)", color: "var(--color-primary-darker)", border: "none" }}>
                        {errorForm}
                    </div>
                )}
            </div>
        </div>
    )
}