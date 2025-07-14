import "../Styles/Carrito.css"
import { Row, Col } from 'react-bootstrap';

function CarritoTarjeta({producto, funcionDisparadora}){
    
    function borrarDelCarrito() {
        console.log("Paso 1")
        funcionDisparadora(producto.id)
    }

    return (
        <div className="border p-3 rounded mb-3 shadow-sm">
            <Row className="align-items-center text-center text-md-start g-3">
                <Col xs={12} md={2}>
                    <div>{producto.name}</div>
                </Col>
                <Col xs={12} md={2}>
                    <div>{producto.description}</div>
                </Col>
                <Col xs={12} md={2}>
                    <img className="img-fluid rounded mt-2" src={producto.imagen} alt={producto.name} style={{ maxHeight: "80px", maxWidth: "100%" }}/>
                </Col>
                <Col xs={6} md={1}>
                    <div>{producto.cantidad}</div>
                </Col>
                <Col xs={6} md={2}>
                    <div>{producto.price} $</div>
                </Col>
                <Col xs={12} md={2}>
                    <div>{producto.cantidad * producto.price} $</div>
                </Col>
                <Col xs={12} md={1} className="d-flex justify-content-center mt-2 mt-md-0">
                    <button className="btn btn-sm btn-danger" onClick={borrarDelCarrito}>X</button>
                </Col>
            </Row>
        </div>
    );
}

export default CarritoTarjeta;