import { useAuthContext } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import "../Styles/Nav.css";
import { Row, Col } from 'react-bootstrap';

export default function Admin() {
    const { user, rol, loading } = useAuthContext();

    if (loading) return <p>Cargando permisos...</p>;

    if (!user || rol !== "admin") {
        return <Navigate to="/login" replace/>;
    }

    return (
    <div className="container py-4">
        <Row className="justify-content-center text-center">
            <Col xs={12} md={10} lg={8}>
                <h2 className="mb-3">Panel de Administración</h2>
                <p className="mb-4">Bienvenido, {user.email}</p>
                <div className="d-flex justify-content-center">
                    <ul className="nav flex-column flex-sm-row gap-3 list-unstyled">
                        <li><Link to="/admin/crearAdmin"><button className="btn btn-outline-primary">Crear nuevo administrador</button></Link></li>
                    </ul>
                </div>
            </Col>
        </Row>
    </div>
    );
}