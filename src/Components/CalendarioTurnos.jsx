import React, { useState, useContext } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';
import { dispararSweetBasico } from '../assets/SweetAlert';

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

        dispararSweetBasico("Turno reservado", `Turno confirmado para el ${turnoCompleto.fecha} a las ${turnoCompleto.horario} hs.`, "success", "Ir al carrito")
            .then(() => {
            navegar("/carrito");
            });

        } else {
        alert('Por favor, seleccioná una fecha y un horario.');
        }
    };

    if (!producto) return <p>Error: No se recibió la información del servicio.</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Reservar turno</h2>
            <p>Servicio: <strong>{producto.name}</strong></p>
            <p>Precio: ${producto.price}</p>
            <p>Cantidad: {producto.cantidad}</p>
            <div>
                <label>Seleccioná una fecha:</label>
                <DatePicker
                selected={fecha}
                onChange={(date) => {
                    setFecha(date);
                    setHorario('');
                }}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}
                placeholderText="Elegí una fecha"/>
            </div>
        {fecha && (
            <div style={{ marginTop: '15px' }}>
            <label>Seleccioná un horario:</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
                    {horariosDisponibles.map((hora) => (
                    <button
                        key={hora}
                        onClick={() => setHorario(hora)}
                        style={{
                        padding: '10px',
                        backgroundColor: horario === hora ? '#4caf50' : '#e0e0e0',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        }}>
                        {hora}
                    </button>
                    ))}
                </div>
            </div>
        )}
        {horario && (
            <div style={{ marginTop: '20px' }}>
                <button onClick={handleConfirmar} className="btn btn-success">Confirmar turno</button>
            </div>
        )}
        </div>
    );
};

export default CalendarioTurnos;

