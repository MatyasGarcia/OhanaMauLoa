import { useAuthContext } from '../context/AuthContext';
import { Navigate, Link } from 'react-router-dom';
import "../Styles/Nav.css";

export default function Admin() {
    const { user, rol, loading } = useAuthContext();

    if (loading) return <p>Cargando permisos...</p>;

    if (!user || rol !== "admin") {
        return <Navigate to="/login" replace/>;
    }

    return (
        <div>
            <h2>Panel de Administración</h2>
            <p>Bienvenido, {user.email}</p>
            <div className="navbar-center">
                <ul className="nav-links">
                    <li><Link to="/admin/crearAdmin"><button>Crear nuevo administrador</button></Link></li>
                </ul>
            </div>
        </div>
    );
}