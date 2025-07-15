import { useEffect, useState } from "react";
import Tarjeta from "./Tarjeta";
import { Container, Row, Col } from 'react-bootstrap';

function Main() {
    const promocionesFalsas = [
        {
            id: "promo1",
            name: "Promo Corte + Peinado",
            price: 2500,
            imagen: "https://via.placeholder.com/150",
            description: "Servicio combinado a precio especial",
        },
        {
            id: "promo2",
            name: "Promo Manos + Esmaltado",
            price: 1800,
            imagen: "https://via.placeholder.com/150",
            description: "Ideal para uñas impecables",
        }
    ];

    return (
    <main className="py-4">
        <Container>
            <h2 className="text-center mb-4">Promociones</h2>
            <Row className="g-4">
                {promocionesFalsas.map((promo) => (
                    <Col key={promo.id} xs={12} sm={6} md={4} lg={3}>
                        <Tarjeta producto={promo} />
                    </Col>
                ))}
            </Row>
        </Container>
    </main>
    );
}

export default Main;