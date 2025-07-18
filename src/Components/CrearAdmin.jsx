import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../assets/Auth/Firebase';
import "../Styles/Nav.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Row, Col } from 'react-bootstrap';

function CrearAdmin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleCrearAdmin = async (e) => {
        e.preventDefault();
        try {
        const credenciales = await createUserWithEmailAndPassword(auth, email, password);
        const nuevoAdmin = credenciales.user;

        await setDoc(doc(db, "usuarios", nuevoAdmin.uid), {
            email: email,
            rol: "admin"
        });

        toast.success("✅ Administrador creado exitosamente.");
        setEmail('');
        setPassword('');
        } catch (error) {
        console.error("Error al crear admin:", error.message);
        toast.error(`❌ Error al crear administrador: ${error.message}`);
        }
    };

    return (
        <div className="container py-4">
            <Row className="w-100 justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <h3 className="mb-3">Crear nuevo administrador</h3>
                    <form onSubmit={handleCrearAdmin}>
                        <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-control mb-3"/>
                        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required className="form-control mb-3"/>
                        <button type="submit" className="btn btn-primary btn-lg">Crear Admin</button>
                    </form>
                    <ToastContainer position="top-center" autoClose={3000}/>
                </Col>
            </Row>
        </div>
    );
}

export default CrearAdmin;
