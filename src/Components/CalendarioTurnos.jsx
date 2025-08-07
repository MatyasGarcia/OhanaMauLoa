import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';
import { dispararSweetBasico } from '../assets/SweetAlert';
import { Row, Col } from 'react-bootstrap';

const horariosDisponibles = [
    '09:00', '10:00', '11:00', '12:00',
    '14:00', '15:00', '16:00', '17:00'
    ];

const CalendarioTurnos = () => {
    const [fecha, setFecha] = useState(null);
    const [horario, setHorario] = useState('');
    const location = useLocation();
    const navegar = useNavigate();
    const { agregarAlCarrito } = useContext(CarritoContext);

    const { producto } = location.state || {};

const handleConfirmar = () => {
    if (fecha && horario) {
        const turnoCompleto = {
            ...producto,
            fecha: fecha.toLocaleDateString(),
            horario: horario
        };

        agregarAlCarrito(turnoCompleto);

        dispararSweetBasico(
            "Turno reservado",
            `Turno confirmado para el ${turnoCompleto.fecha} a las ${turnoCompleto.horario} hs.`,
            "success",
            "Seguir Comprando"
        );

    } else {
        alert('Por favor, seleccioná una fecha y un horario.');
    }
};

    if (!producto) return <p>Error: No se recibió la información del servicio.</p>;

return (
    <div className="container py-4">
        <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
                <h2 className="text-center mb-4">Reservar turno</h2>
                <div className="mb-3">
                    <p><strong>Servicio:</strong> {producto.name}</p>
                    <p><strong>Precio:</strong> ${producto.price}</p>
                    <p><strong>Cantidad:</strong> {producto.cantidad}</p>
                </div>
                <div className="mb-4">
                    <label className="form-label"><strong>Seleccioná una fecha:</strong></label>
                    <div className="d-flex justify-content-center">
                        <DatePicker
                            selected={fecha}
                            onChange={(date) => {
                                setFecha(date);
                                setHorario('');
                            }}
                            dateFormat="dd/MM/yyyy"
                            minDate={new Date()}
                            placeholderText="Elegí una fecha"
                            inline/>
                    </div>
                </div>
                {fecha && (
                    <div className="mb-4">
                        <label className="form-label"><strong>Seleccioná un horario:</strong></label>
                        <div className="d-flex flex-wrap gap-2 justify-content-center">
                            {horariosDisponibles.map((hora) => (
                                <button
                                    key={hora}
                                    onClick={() => setHorario(hora)}
                                    className={`btn ${horario === hora ? 'btn-success' : 'btn-outline-secondary'}`}>
                                    {hora}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                {horario && (
                    <div className="text-center mt-3">
                        <button onClick={handleConfirmar} className="btn btn-success">Confirmar turno</button>
                    </div>
                )}
            </Col>
        </Row>
    </div>
);
}

export default CalendarioTurnos;

