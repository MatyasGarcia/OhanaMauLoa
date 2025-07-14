import React, { useState } from 'react';
import { dispararSweetBasico } from '../assets/SweetAlert';
import "../Styles/Nav.css";
import { useProductosContext } from '../context/ProductosContext';
import { useAuthContext } from '../context/AuthContext';
import { Row, Col } from 'react-bootstrap';

function AgregarProducto({}) {
    const {user, rol} = useAuthContext();
    const {agregarProducto} = useProductosContext ();
    const [producto, setProducto] = useState({
        name: '',
        price: '',
        description: '',
        img: '',
    });

    const [errores, setErrores] = useState({});

const validarFormulario = () => {
    if (!producto.name || producto.name.trim() === "") {
        return "El nombre es obligatorio.";
    }
    if (!producto.price || producto.price <= 0) {
        return "El precio debe ser mayor a 0.";
    }
    if (!producto.description || producto.description.trim().length < 10) {
        return "La descripción debe tener al menos 10 caracteres.";
    }
    if (!producto.img || producto.img.trim() === "") {
        return "La URL de la imagen no debe estar vacía.";
    }
    return true;
};

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validarForm = validarFormulario()
        if (validarForm == true) {
        agregarProducto(producto).then((data) => {
            setProducto({ name: '', price: '', description: '', img: ""});
        }).catch((error) => {
            dispararSweetBasico("Hubo un problema al agregar el producto", error, "error", "Cerrar")
        })
        } else{
        dispararSweetBasico("Error en la carga de producto", validarForm, "error", "Cerrar")
        }
    }

    if (!user || rol !== "admin") {
        return <Navigate to="/login" replace/>;
    }

    return (
        <div className="container py-4">
            <Row className="justify-content-center">
                <Col xs={12} md={8} lg={6}>
                    <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white">
                        <h2 className="mb-4 text-center">Agregar Producto</h2>
                            <div className="mb-3">
                                <label className="form-label">Nombre:</label>
                                <input type="text" name="name" value={producto.name} onChange={handleChange} className="form-control"/>
                                {errores.name && <p className="text-danger">{errores.name}</p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Precio:</label>
                                <input type="number" name="price" value={producto.price} onChange={handleChange} min="0" className="form-control"/>
                                {errores.price && <p className="text-danger">{errores.price}</p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Descripción:</label>
                                <textarea name="description" value={producto.description} onChange={handleChange} className="form-control"/>
                                {errores.description && <p className="text-danger">{errores.description}</p>}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">URL de la Imagen:</label>
                                <input type="text" name="img" value={producto.img} onChange={handleChange} className="form-control"/>
                                {errores.img && <p className="text-danger">{errores.img}</p>}
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary w-100 w-md-50">Agregar Producto</button>
                            </div>
                    </form>
                </Col>
            </Row>
        </div>
    );
}

export default AgregarProducto;


