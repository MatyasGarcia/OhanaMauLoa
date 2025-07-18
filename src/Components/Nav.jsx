import { useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Badge, Image } from "react-bootstrap";
import { CarritoContext } from "../context/CarritoContext";
import { useAuthContext } from "../context/AuthContext";
import { FaShoppingCart } from "react-icons/fa";
import LogoOhana from "../assets/IMG/Logo-Ohana.jpg";
import "../Styles/Nav.css";

function NavBarOhana() {
    const { productosCarrito } = useContext(CarritoContext);
    const { rol } = useAuthContext();

    return (
        <Navbar bg="light" expand="lg" sticky="top" className="shadow-sm">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    <Image src={LogoOhana} alt="Logo Ohana" width={50} height={50} roundedCircle />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navbar-ohana" />
                <Navbar.Collapse id="navbar-ohana">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                            <Nav.Link as={Link} to="/servicios">Servicios</Nav.Link>
                            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
                            <Nav.Link as={Link} to="/consultas">Consultas</Nav.Link>
                            {rol === "admin" && (<><Nav.Link as={Link} to="/admin">Panel Admin</Nav.Link></>)}
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/carrito">
                            <FaShoppingCart style={{ marginRight: "5px" }} />
                            {productosCarrito.length > 0 && (
                                <Badge bg="danger" pill>{productosCarrito.length}</Badge>
                            )}
                        </Nav.Link>
                        <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBarOhana;

