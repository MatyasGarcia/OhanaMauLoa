import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../Styles/ServiciosDetalle.css"
import { dispararSweetBasico } from "../assets/SweetAlert";
import { CarritoContext } from "../context/CarritoContext";
import { useAuthContext } from '../context/AuthContext';
import { useProductosContext } from "../context/ProductosContext";
import { Row, Col } from 'react-bootstrap';

function ServiciosDetalles ({}) {
    
    const navegar = useNavigate();

    const {agregarAlCarrito} = useContext (CarritoContext)
    const { rol } = useAuthContext();
    const admin = rol === "admin";
    const {productoEncontrado, obtenerProducto, eliminarProducto} = useProductosContext();

    const { id } = useParams ();
    const [cantidad, setCantidad] = useState (1);
    const [cargando, setCargando] = useState (true);
    const [error, setError] = useState (null)

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

    function funcionCarrito() {
        if (cantidad < 1) return;
        dispararSweetBasico("Producto Agregado", "El producto fue agregado con éxito", "success", "Cerrar");
        agregarAlCarrito({ ...productoEncontrado, cantidad });
    }

    function dispararEliminar(){
        eliminarProducto(id).then(() => {
            navegar("/servicios")
        }).catch((error) =>{
            dispararSweetBasico("Hubo un problema al agregar el producto", error, "error", "Cerrar")
        })
    }

    function sumarContador() {
        setCantidad(cantidad + 1);
    }

    function restarContador(){
        if (cantidad > 1) setCantidad(cantidad - 1);
    }

    if (cargando) return <p>Cargando producto...</p>;
    if (error) return <p>{error}</p>;
    if (!productoEncontrado) return null;
    if (!productoEncontrado || !productoEncontrado.name) return <p>Producto no válido.</p>;

    return (
    <div className="Detalle-card">
        <Row xs={1}>
            <Col>
                <img className="Detalle-image" src={productoEncontrado.imagen} alt={`Imagen de ${productoEncontrado.name}`}/>
            </Col>
            <Col>
                <div className="Detalle-info">
                    <h2>{productoEncontrado.name}</h2>
                    <p>{productoEncontrado.description}</p>
                    <p>{productoEncontrado.price}$</p>
                    <div>
                        <button onClick={restarContador}>-</button>
                        <span>{cantidad}</span>
                        <button onClick={sumarContador}>+</button>
                    </div>
                    {admin ? (
                        <div className="Admin-buttons">
                            <Link to={`/admin/editarProducto/${id}`}>
                                <button className="btn btn-primary btn-sm">Editar producto</button>
                                <button onClick={dispararEliminar} className="btn btn-primary btn-sm">Eliminar Producto</button>
                            </Link>
                        </div>
                ) : (
                    <button onClick={funcionCarrito} className="btn btn-primary w-50">Solicitar Turno</button>
                )}
                </div>
            </Col>
        </Row>
    </div>
    );
}

export default ServiciosDetalles;