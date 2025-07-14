import { Helmet } from "react-helmet";
import { Row, Col } from 'react-bootstrap';

function ProductosConteiner({}){
        return(
            <div>
                <Row>
                    <Col>
                        <Helmet>
                            <title> Productos | Ohana </title>
                            <meta name="description" content="Explora nuestra variedad de productos." />
                        </Helmet>
                        <p>PROXIMAMENTE PROXIMAMENTE</p>
                    </Col>
                </Row>
            </div>
        )
    }

export default ProductosConteiner;