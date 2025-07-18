import { Row, Col } from 'react-bootstrap';

export default function Cosultas(){

    return (
    <div className="container-fluid py-4 px-3">
        <Row className="w-100 justify-content-center">
            <Col xs={12} sm={10} md={8} lg={6}>
                <h3 className="mb-4 text-center">Dejanos tu Consulta</h3>
                <form action="https://formspree.io/f/xnnqazkb" method="post" className="p-4 border rounded shadow bg-white text-center">
                <div className="mb-3 text-start">
                    <label htmlFor="Usuario" className="form-label">Nombre</label>
                    <input type="text" name="Usuario" className="form-control" placeholder="Nombre" required/>
                </div>
                <div className="mb-3 text-start">
                    <label htmlFor="Correo" className="form-label">Correo</label>
                    <input type="email" name="Correo" className="form-control" placeholder="Correo Electrónico" required/>
                </div>
                <div className="mb-3 text-start">
                    <label htmlFor="Mensaje" className="form-label">Mensaje</label>
                    <textarea name="Mensaje" className="form-control" rows="5" placeholder="Deje aquí su mensaje (500 caracteres)" required></textarea>
                </div>
                <div className="d-grid">
                    <input type="submit" value="Enviar Comentario" className="btn btn-primary btn-lg"/>
                </div>
                </form>
            </Col>
        </Row>
    </div>
    );
}