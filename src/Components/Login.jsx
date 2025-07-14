import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { dispararSweetBasico } from '../assets/SweetAlert';
import { Row, Col } from 'react-bootstrap';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, rol, user, logout } = useAuthContext();
    const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await login(email, password);
        dispararSweetBasico("Ingreso exitoso", "", "success", "Entrar");
        if (rol === "admin") {
            navigate('/admin');
        } else {
            navigate('/');
        }
    } catch (error) {
    console.error(error);
    if (error.code === "auth/invalid-credential") {
        dispararSweetBasico("Credenciales incorrectas", "", "error", "Cerrar");}
    else if (error.code === "auth/too-many-requests") {
        dispararSweetBasico("Demasiados intentos", "Esperá unos minutos antes de volver a intentarlo", "warning", "Cerrar");}
    else {
        dispararSweetBasico("Error", "Ocurrió un problema al iniciar sesión", "error", "Cerrar");}
    };
}

    const handleLogout = async (e) => {
        e.preventDefault();
        await logout();
    };

    if (user) {
        return (
            <form onSubmit={handleLogout}>
                <button type="submit" className="btn btn-primary w-50">Cerrar sesión</button>
            </form>
        );
    }

    return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <Row className="w-100 justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6} xl={4}>
                <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white">
                    <h2 className="mb-4 text-center">Iniciar sesión</h2>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input
                        className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Contraseña:</label>
                        <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    </div>
                    <div className="d-grid mb-3">
                        <button className="btn btn-primary" type="submit">Iniciar sesión</button>
                    </div>
                    <p className="text-center">¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
                    </p>
                </form>
            </Col>
        </Row>
    </div>
    );
}

export default Login;