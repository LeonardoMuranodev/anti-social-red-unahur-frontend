import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContextGlobal } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { loginUser, registerUser } from "../services/userServices";
import Footer from "./Footer";

interface AuthFormProps {
    tipo: 'login' | 'signup';
}

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export default function AuthForm({ tipo }: AuthFormProps) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [errorForm, setErrorForm] = useState("");
    const [formEnviado, setFormEnviado] = useState(false);

    const { login } = useContext(AuthContextGlobal);
    const navigate = useNavigate();

    const titleText = tipo === "login" ? "Iniciar Sesión" : "Registrarse";

    const FormSubmit = async (data: any) => {
        setErrorForm("");
        setFormEnviado(true);

        await wait(1000);

        try {
            if (tipo === "login") {
                const user = await loginUser(data.nickname, data.password);
                login(user);
                navigate("/user");
            } else {
                await registerUser(data.nickname, data.password);
                navigate("/login");
            }
        } catch (err: any) {
            setErrorForm(err.message);
        } finally {
            setFormEnviado(false);
        }
    };

    return (
        <section className="auth-section d-flex align-items-center justify-content-center px-3 py-5">
            <div
                className="card border-0 shadow-lg w-100"
                style={{
                    maxWidth: "520px",
                    backgroundColor: "var(--bs-dark)",
                    borderRadius: "18px",
                    overflow: "hidden"
                }}
            >
                <div className="card-body p-4 p-sm-5">

                    <div className="text-center mb-4">
                        <h2 className="fw-bold text-danger mb-2">antiSocial</h2>
                        <h4 className="text-white mb-1">{titleText}</h4>
                        <p className="text-secondary small mb-0">Acá nadie se salva.</p>
                    </div>

                    <form onSubmit={handleSubmit(FormSubmit)} noValidate>

                        <div className="mb-3">
                            <label className="form-label text-white fw-semibold">Nickname</label>

                            <input
                                {...register("nickname", {
                                    required: true,
                                    minLength: 3,
                                    pattern: /^[a-zA-Z0-9\s]+$/
                                })}
                                type="text"
                                className={`form-control bg-white text-dark border-0 ${
                                    errors.nickname ? "border border-warning" : ""
                                }`}
                                placeholder="Ej: ddd"
                                autoComplete="username"
                            />

                            <small className="text-warning d-block mt-1">
                                {errors.nickname?.type === "required" && "Obligatorio"}
                                {errors.nickname?.type === "minLength" && "Mínimo 3 caracteres"}
                                {errors.nickname?.type === "pattern" && "Formato inválido"}
                            </small>
                        </div>

                        <div className="mb-4">
                            <label className="form-label text-white fw-semibold">Contraseña</label>

                            <input
                                {...register("password", {
                                    required: true,
                                    minLength: 3
                                })}
                                type="password"
                                className={`form-control bg-white text-dark border-0 ${
                                    errors.password ? "border border-warning" : ""
                                }`}
                                placeholder="••••••"
                                autoComplete="current-password"
                            />

                            <small className="text-warning d-block mt-1">
                                {errors.password?.type === "required" && "Obligatorio"}
                                {errors.password?.type === "minLength" && "Mínimo 3 caracteres"}
                            </small>
                        </div>

                        <button
                            type="submit"
                            disabled={formEnviado}
                            className="btn btn-danger w-100 fw-bold py-2"
                        >
                            {formEnviado ? "Procesando..." : titleText}
                        </button>
                    </form>

                    {errorForm && (
                        <div className="alert alert-danger text-center mt-3 py-2">
                            {errorForm}
                        </div>
                    )}

                    <div className="text-center mt-4 text-white">
                        <p className="mb-1 small">
                            {tipo === "login"
                                ? "¿No tenés una cuenta?"
                                : "¿Ya tenés una cuenta?"}
                        </p>

                        <Link
                            to={tipo === "login" ? "/signup" : "/login"}
                            className="text-danger fw-bold text-decoration-none"
                        >
                            {tipo === "login"
                                ? "Registrate acá"
                                : "Iniciá sesión acá"}
                        </Link>
                        
                    </div>
                                    
                </div>
            </div>
          
        </section>
     
    );
}