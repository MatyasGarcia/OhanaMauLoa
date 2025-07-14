import { Link } from "react-router-dom";
import CarritoTarjeta from "./CarritoTarjeta"
import { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { useAuthContext } from '../context/AuthContext';
import { Row, Col } from 'react-bootstrap';

export default function Carrito({ adminLogeado }) {
        const {user} = useAuthContext();
        const {productosCarrito, vaciarCarrito, borrarProductoCarrito} = useContext (CarritoContext);

        const total = productosCarrito.reduce(
        (subTotal, producto) => subTotal + producto.price * producto.cantidad, 0 );
    function funcionDisparadora(id) {
        borrarProductoCarrito(id);
    }
    function funcionVaciarCarrito(id) {
        vaciarCarrito(id);
    }
    if (!user && !adminLogeado) {
    return (
        <div className="carrito-container">
            <p>Debes iniciar sesión para ver el carrito.</p>
            <li><Link to="/login">Iniciar Sesión</Link></li>
        </div>
    );
    }

    return (
        <div className="container carrito-container py-4">
            <Row>
                <Col>
                    <div className="d-none d-md-grid carrito-grid encabezado text-center fw-bold mb-3">
                        <div>Producto</div>
                        <div>Descripción</div>
                        <div>Imagen</div>
                        <div>Cantidad</div>
                        <div>Precio unitario</div>
                        <div>Sub total</div>
                        <div>Acción</div>
                    </div>
                    {productosCarrito.length > 0 ? (
                    productosCarrito.map((producto) => (
                        <CarritoTarjeta key={producto.id} producto={producto} funcionDisparadora={funcionDisparadora}/>
                    ))
                    ) : (<p className="text-center">Carrito vacío</p>)}
                    {total > 0 && (
                    <div className="mt-4 text-center">
                        <h5>Total a pagar: <strong>{total} $</strong></h5>
                        <button onClick={funcionVaciarCarrito} className="btn btn-danger mt-2">Vaciar carrito</button>
                    </div>
                    )}
                </Col>
            </Row>
        </div>
    );
}
