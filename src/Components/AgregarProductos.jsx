import React, { useState } from 'react';
import { dispararSweetBasico } from '../assets/SweetAlert';
import "../Styles/Nav.css";
import { useProductosContext } from '../context/ProductosContext';
import { useAuthContext } from '../context/AuthContext';

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
        <div className="d-flex flex-column  justify-content-center  align-items-center">
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow w-50">
                <h2>Agregar Producto</h2>
                    <div className="mb-3">
                        <label className="form-label">Nombre:</label>
                        <input type="text" name="name" value={producto.name} onChange={handleChange} className="form-control"/>
                        {errores.name && <p style={{ color: 'red' }}>{errores.name}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Precio:</label>
                        <input type="number" name="price" value={producto.price} onChange={handleChange} min="0" className="form-control"/>
                        {errores.price && <p style={{ color: 'red' }}>{errores.price}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descripción:</label>
                        <textarea name="description" value={producto.description} onChange={handleChange} className="form-control"/>
                        {errores.description && <p style={{ color: 'red' }}>{errores.description}</p>}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">URL de la Imagen:</label>
                        <input type="text" name="img" value={producto.img} onChange={handleChange} className="form-control"/>
                        {errores.img && <p style={{ color: 'red' }}>{errores.img}</p>}
                    </div>
                <button type="submit" className="btn btn-primary w-50">Agregar Producto</button>
            </form>
        </div>
    );
}

export default AgregarProducto;


