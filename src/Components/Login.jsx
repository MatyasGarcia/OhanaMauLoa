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
            <div className="container-fluid d-flex justify-content-center py-4">
                <form onSubmit={handleLogout} className="w-100 d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary w-50">Cerrar sesión</button>
                </form>
            </div>
        );
    }

    return (
    <div className="container-fluid py-4 px-3">
        <Row className="justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6}>
                <form onSubmit={handleSubmit} className="p-4 px-3 border rounded shadow bg-white text-center">
                    <h2 className="mb-4">Iniciar sesión</h2>
                    <div className="mb-3 text-start">
                        <label className="form-label">Email:</label>
                        <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                    </div>
                    <div className="mb-3 mb-3 text-start">
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