import "../Styles/Carrito.css"
import { Row, Col } from 'react-bootstrap';

function CarritoTarjeta({producto, funcionDisparadora}){
    
    function borrarDelCarrito() {
        console.log("Paso 1")
        funcionDisparadora(producto.id)
    }

    return (
        <div className="border p-3 rounded mb-3 shadow-sm">
            <Row className="align-items-center text-center text-md-start">
                <Col xs={12} md={2}>
                    <h5 className="fw-bold d-md-none">Producto:</h5>
                    <p>{producto.name}</p>
                </Col>
                <Col xs={12} md={2}>
                    <h5 className="fw-bold d-md-none">Descripción:</h5>
                    <p>{producto.description}</p>
                </Col>
                <Col xs={12} md={2}>
                    <h5 className="fw-bold d-md-none">Imagen:</h5>
                    <img src={producto.imagen} alt={producto.name} className="img-fluid rounded mx-auto d-block" style={{ maxHeight: "80px" }}/>
                </Col>
                <Col xs={6} md={1}>
                    <h5 className="fw-bold d-md-none">Cantidad:</h5>
                    <p>{producto.cantidad}</p>
                </Col>
                <Col xs={6} md={2}>
                    <h5 className="fw-bold d-md-none">Precio unitario:</h5>
                    <p>{producto.price} $</p>
                </Col>
                <Col xs={12} md={2}>
                    <h5 className="fw-bold d-md-none">Subtotal:</h5>
                    <p>{producto.cantidad * producto.price} $</p>
                </Col>
                <Col xs={12} md={1} className="text-center text-md-start">
                    <button className="btn btn-sm btn-danger" onClick={borrarDelCarrito}>X</button>
                </Col>
            </Row>
        </div>
    );
}

export default CarritoTarjeta;