import { useEffect, useState } from "react";
import Tarjeta from "./Tarjeta";

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
        <main>
            <div>
                <h2>Promociones</h2>
                <div className="Detalle-conteiner">
                    {promocionesFalsas.map((promo) => (
                        <Tarjeta key={promo.id} producto={promo} />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Main;