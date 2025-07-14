import "../Styles/ServiciosDetalle.css";
import { Link } from "react-router-dom";

function Tarjeta({ producto }) {
    const { imagen, name, price, id } = producto;

    return (
        <div className="Detalle-card">
            <img className="Detalle-image" src={imagen} alt={`Imagen de ${name}`}/>
            <h2 className="Detalle-nombre">{name}</h2>
            <p className="Detalle-precio">{price} $</p>
            <Link to={`/productos/${id}`}>
                <button className="btn btn-primary btn-sm">Ver detalles del Servicio</button>
            </Link>
        </div>
    );
}

export default Tarjeta;