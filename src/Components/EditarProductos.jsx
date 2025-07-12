import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, Navigate } from 'react-router-dom';
import { useProductosContext } from '../context/ProductosContext';
import { dispararSweetBasico } from '../assets/SweetAlert';
import { useAuthContext } from '../context/AuthContext';

function EditarProducto() {
    const {user, rol} = useAuthContext();
    const { id } = useParams();
    const navigate = useNavigate();
    const { obtenerProducto, actualizarProducto, productoEncontrado, editarProducto } = useProductosContext();

const [producto, setProducto] = useState(productoEncontrado);
const [cargando, setCargando] = useState(true);
const [error, setError] = useState(null); 

    if (!user || rol !== "admin") {
        return <Navigate to="/login" replace/>;
    }

    useEffect(() => {
            obtenerProducto(id).then(() =>{
                setCargando(false);
            }).catch((error) => {
                if(error == "Producto no encontrado"){
                    setError("Producto no encontrado")
                }
                if(error == "Hubo un error al obtener el producto."){
                    setError("Hubo un error al obtener el producto.")
                }
                setCargando(false);
            })
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

const validarFormulario = () => {
    if (!producto.name.trim()) return "El nombre es obligatorio.";
    if (!producto.price || producto.price <= 0) return "El precio debe ser mayor a 0.";
    if (!producto.description.trim() || producto.description.length < 10) return "La descripción debe tener al menos 10 caracteres.";
    if (!producto.imagen.trim()) return "La URL de la imagen no debe estar vacía.";
    return true;
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const validarForm = validarFormulario();
    if (validarForm === true) {
            editarProducto(producto).then((prod) => {
                dispararSweetBasico("Actualizado", "El producto fue actualizado correctamente.", "success", "OK");
                navigate("/servicios");
            })
            .catch((error) => {
                dispararSweetBasico("Error", "No se pudo actualizar el producto: " + error.message, "error", "Cerrar");
            });
    } else {
        dispararSweetBasico("Error en la carga de producto", validarForm, "error", "Cerrar");
    }
};

    if (!producto) return <p>Cargando producto...</p>;

    return (
        <div className="d-flex flex-column  justify-content-center  align-items-center">
            <form onSubmit={handleSubmit} className="p-4 border rounded shadow w-50">
                <h2>Editar Producto</h2>
                <div className="mb-3">
                    <label className="form-label">Nombre:</label>
                    <input name="name" value={producto.name || ''} onChange={handleChange} className="form-control"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Precio:</label>
                    <input name="price" type="number" value={producto.price || ''} onChange={handleChange} className="form-control"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Descripción:</label>
                    <textarea name="description" value={producto.description || ''} onChange={handleChange} className="form-control"/>
                </div>
                <div className="mb-3">
                    <label className="form-label">Imagen:</label>
                    <input name="imagen" value={producto.imagen || ''} onChange={handleChange} className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary w-50">Guardar cambios</button>
            </form>
        </div>
    );
}

export default EditarProducto;