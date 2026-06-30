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
    <>
        <section
            className="d-flex justify-content-center align-items-center auth-section"
            style={{ minHeight: "100vh", padding: "40px 20px" }}
        >
            <div
                className="card border-0 shadow-lg"
                style={{
                    width: "100%",
                    maxWidth: "430px",
                    backgroundColor: "#212529",
                    borderRadius: "18px",
                    boxShadow: "0 15px 40px rgba(0,0,0,.45)",
                    overflow: "hidden"
                }}
            >
                <div className="card-body p-5">

                    <div className="text-center mb-4">
                        <h2 className="fw-bold text-danger mb-2">
                            antiSocial
                        </h2>

                        <h4 className="text-white">
                            {titleText}
                        </h4>

                        <p className="text-secondary mb-0">
                            Acá nadie se salva.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit(FormSubmit)} noValidate>

                        <div className="mb-3">
                            <label htmlFor="nickname" className="form-label text-white fw-semibold">
                                Nickname
                            </label>

                            <input
                                {...register("nickname", {
                                    required: true,
                                    minLength: 3,
                                    pattern: /^[a-zA-Z0-9\s]+$/
                                })}
                                type="text"
                                className="form-control"
                                id="nickname"
                                placeholder="Ej: ddd"
                            />

                            <div className="text-warning mt-1 auth-error-text">
                                {errors.nickname?.type === "required" && "Este campo es obligatorio"}
                                {errors.nickname?.type === "minLength" && "Mínimo 3 caracteres"}
                                {errors.nickname?.type === "pattern" && "El nickname es incorrecto"}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="form-label text-white fw-semibold">
                                Contraseña
                            </label>

                            <input
                                {...register("password", {
                                    required: true,
                                    minLength: 3
                                })}
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="••••••"
                            />

                            <div className="text-warning mt-1 auth-error-text">
                                {errors.password?.type === "required" && "Este campo es obligatorio"}
                                {errors.password?.type === "minLength" && "Mínimo 3 caracteres"}
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={formEnviado}
                            className="btn btn-danger w-100 fw-bold py-2 mb-3"
                        >
                            {!formEnviado ? titleText : "Procesando..."}
                        </button>
                    </form>

                    {errorForm && (
                        <div className="alert alert-danger text-center auth-alert" role="alert">
                            {errorForm}
                        </div>
                    )}

                    <hr className="border-secondary" />

                    <div className="text-center text-white">
                        <p className="mb-1">
                            {tipo == "login"
                                ? "¿No tenes una cuenta?"
                                : "¿Ya tenes una cuenta?"}
                        </p>

                        <Link
                            to={tipo == "login" ? "/signup" : "/login"}
                            className="text-danger fw-bold text-decoration-none"
                        >
                            {tipo == "login"
                                ? "Registrate acá"
                                : "Inicia sesión acá"}
                        </Link>
                    </div>

                </div>
            </div>
        </section>

        <Footer />
    </>
); }