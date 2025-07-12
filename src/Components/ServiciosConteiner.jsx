import { useEffect, useState } from "react";
import Tarjeta from "./Tarjeta";
import { useProductosContext } from "../context/ProductosContext";
import { useAuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import "../Styles/ServiciosDetalle.css";
import BotonMas from "../assets/IMG/BotonMas.png"
import { Helmet } from 'react-helmet';
import { Container, Row, Col } from 'react-bootstrap';

function ServiciosConteiner() {
    const { rol, loading } = useAuthContext();
    const { productos, obtenerProductos } = useProductosContext();
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [busqueda, setBusqueda] = useState("");
    const productosPorPagina = 3;
    const [paginaActual, setPaginaActual] = useState(1);

    const productosFiltrados = productos.filter(producto =>
        producto.name.toLowerCase().includes(busqueda.toLowerCase())
    );

    const indexUltimoProducto = paginaActual * productosPorPagina;
    const indexPrimerProducto = indexUltimoProducto - productosPorPagina;
    const productosActuales = productosFiltrados.slice(indexPrimerProducto, indexUltimoProducto);
    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

    useEffect(() => {
        obtenerProductos()
        .then(() => setCargando(false))
        .catch(() => {
            setError('Hubo un problema al cargar los productos.');
            setCargando(false);
        });
    }, []);

    const cambiarPagina = (numeroPagina) => setPaginaActual(numeroPagina);

    if (loading) return <p>Cargando permisos...</p>;
    if (cargando) return <p>Cargando productos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <Helmet>
                <title>Servicios | Ohana</title>
                <meta name="description" content="Explora nuestra variedad de productos." />
            </Helmet>
            <div>
                <input type="text" placeholder="Buscar productos..." className="form-control mb-3" value={busqueda} onChange={(e) => setBusqueda(e.target.value)}/>
                <Row xs={1} md={2} lg={4} className="g-4">
                    {rol === "admin" && (
                        <Link to="/admin/agregarProductos">
                            <div className="Detalle-card">
                                <img src={BotonMas} alt="BotonMas" className="Detalle-image" />
                                <button className="btn btn-primary btn-sm">Agregar Productos</button>
                            </div>
                        </Link>
                    )}
                    {productosActuales.length > 0 ? (
                        productosActuales.map((producto) => (
                        <Col key={producto.id}>
                            <Tarjeta producto={producto} />
                        </Col>
                        ))
                    ) : (
                        <p>No se encontraron productos.</p>
                    )}
                </Row>
                {totalPaginas > 1 && (
                <div className="d-flex justify-content-center my-4">
                    {Array.from({ length: totalPaginas }, (_, index) => (
                    <button
                        key={index + 1}
                        className={`btn mx-1 ${paginaActual === index + 1 ? "btn-primary" : "btn-outline-primary"}`}
                        onClick={() => cambiarPagina(index + 1)}>
                        {index + 1}
                    </button>
                    ))}
                </div>
                )}
            </div>
        </div>
    );
}

export default ServiciosConteiner;