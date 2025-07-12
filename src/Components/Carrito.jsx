import { Link } from "react-router-dom";
import CarritoTarjeta from "./CarritoTarjeta"
import { useContext, useState } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { useAuthContext } from '../context/AuthContext';

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
    <div className="carrito-container">
        <div className="carrito-grid encabezado">
            <h2>Producto</h2>
            <h2>Descripción</h2>
            <h2>Imagen</h2>
            <h2>Cantidad</h2>
            <h2>Precio unitario</h2>
            <h2>Sub total</h2>
            <h2>Acción</h2>
        </div>
        {productosCarrito.length > 0 ? (
        productosCarrito.map((producto) => (
            <CarritoTarjeta key={producto.id} producto={producto} funcionDisparadora={funcionDisparadora} />
        ))
        ) : (
        <p>Carrito vacío</p>
        )}
        {total > 0 && <span>Total a pagar: {total} $</span>}
        <button onClick={funcionVaciarCarrito} className="btn btn-primary">Vaciar carrito</button>
    </div>
    );
}
