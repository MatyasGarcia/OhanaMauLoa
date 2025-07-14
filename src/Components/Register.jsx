import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { dispararSweetBasico } from '../assets/SweetAlert';
import { Row, Col } from 'react-bootstrap';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuthContext();
    const navigate = useNavigate();

const registrarUsuario = async (e) => {
    e.preventDefault();
    try {
        await register(email, password);
        dispararSweetBasico("Registro exitoso", "", "success", "Continuar");
        navigate('/');}
    catch (error) {
    console.error(error);
    if (error.code === "auth/email-already-in-use") {
        dispararSweetBasico("Correo en uso", "Ese correo ya está registrado", "error", "Cerrar");}
    else if (error.code === "auth/weak-password") {
        dispararSweetBasico("Contraseña débil", "La contraseña debe tener al menos 6 caracteres", "error", "Cerrar");}
    else {
        dispararSweetBasico("Error", "Ocurrió un error al registrar", "error", "Cerrar");}
    };
}

    return (
        <div className="d-flex flex-column  justify-content-center  align-items-center">
            <Row>
                <Col>
                    <form onSubmit={registrarUsuario} className="p-4 border rounded shadow w-50">
                        <h2>Registrarse</h2>
                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Contraseña:</label>
                            <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                        </div>
                        <button type="submit" className="btn btn-primary w-50">Registrarse</button>
                    </form>
                </Col>
            </Row>
        </div>
    );
}

export default Register;