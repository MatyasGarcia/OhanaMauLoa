import Foto1 from "../assets/IMG/Foto1.jpg"
import "../Styles/Header.css"
import { Row, Col } from 'react-bootstrap';

function Header() {

return (
    <header className="HeaderContainer container py-4">
        <Row className="align-items-center">
            <Col xs={12} md={5} className="text-center">
                <img src={Foto1} alt="Foto1" className="HeaderImage img-fluid rounded" />
            </Col>
            <Col xs={12} md={7}>
                <div className="HeaderText text-center text-md-start">
                    <p>
                        Un lugar donde abunda la buena onda y un increíble servicio.  
                        Trabajamos como una familia para realzar tu belleza y que te sientas como en casa.
                    </p>
                </div>
            </Col>
        </Row>
    </header>
);
}

export default Header;