import { Link } from "react-router-dom";
import LogoOhana from "../assets/IMG/Logo-Ohana.jpg";
import "../Styles/Nav.css";
import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext";
import { useAuthContext } from "../context/AuthContext";
import { FaShoppingCart } from "react-icons/fa";

function Nav() {
    const { productosCarrito } = useContext(CarritoContext);
    const { rol } = useAuthContext();

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src={LogoOhana} alt="Logo Ohana" className="logo" />
            </div>
            <div className="navbar-center">
                <ul className="nav-links">
                    <li><Link to="/">Inicio</Link></li>
                    <li><Link to="/servicios">Servicios</Link></li>
                    <li><Link to="/productos">Productos</Link></li>
                    <li><Link to="/consultas">Consultas</Link></li>
                    <li><Link to="/login">Iniciar Sesión</Link></li>
                    {rol === "admin" && (<><li><Link to="/admin">Panel Admin</Link></li></>)}
                    <div style={{}}><li><Link to="/carrito"> <FaShoppingCart/> <span>{productosCarrito.length > 0 ? productosCarrito.length : ""}</span></Link></li></div>
                </ul>
            </div>
        </nav>
    );
}

export default Nav;