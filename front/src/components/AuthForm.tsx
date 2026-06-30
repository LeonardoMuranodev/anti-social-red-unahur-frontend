import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContextGlobal } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { loginUser, registerUser } from "../services/userServices";

interface AuthFormProps {
    tipo: 'login' | 'signup';
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function AuthForm({tipo}: AuthFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorForm, setErrorForm] = useState<string>("");

    const { login } = useContext(AuthContextGlobal);
    const navigate = useNavigate();

    const [formEnviado, setFormEnviado] = useState<boolean>(false);

    const titleText = tipo == "login" ? "Iniciar Sesión" : "Registrarse"

    const FormSubmit = async (data: any) => {
        setErrorForm("");
        setFormEnviado(true)

        await wait(1000);
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
        } finally {
            setFormEnviado(false)
            setErrorForm("")
        }
    }

    return (
        <section className="d-flex justify-content-center align-items-center vh-100 auth-section">
            <div className="card shadow-lg p-4 auth-card">
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
                        <div className="text-warning mt-1 auth-error-text">
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
                        <div className="text-warning mt-1 auth-error-text">
                            {errors.password?.type === 'required' && "Este campo es obligatorio"}
                            {errors.password?.type === 'minLength' && "Mínimo 3 caracteres"}
                        </div>
                    </div>
                    
                    <button type="submit" disabled={formEnviado} className="btn btn-primary w-100 fw-bold mb-3 auth-button">
                        {!formEnviado ? "Ingresar" : "Ingresando..."}
                    </button>
                </form>

                {errorForm && (
                    <div className="alert alert-danger text-center auth-alert" role="alert">
                        {errorForm}
                    </div>
                )}

                <div className="text-center mt-3 text-white">
                    <p>{tipo == "login" ? "No tenes una cuenta?" : "Ya tenes una cuenta?"} 
                        {" "}
                        <Link to={tipo == "login" ? "/signup" : "/login"} className="auth-link">
                            {tipo == "login" ? "Registrate acá" : "Inicia sesion acá"}
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    )
}