import "../Styles/Carrito.css"

function CarritoTarjeta({producto, funcionDisparadora}){
    
    function borrarDelCarrito() {
        console.log("Paso 1")
        funcionDisparadora(producto.id)
    }

    return (
    <div className="carrito-grid">
        <h3>{producto.name}</h3>
        <p>{producto.description}</p>
        <img className="Carrito-image" src={producto.imagen} alt={producto.name} />
        <span>{producto.cantidad}</span>
        <span>{producto.price} $</span>
        <span>{producto.cantidad * producto.price} $</span>
        <button className="boton-carrito" onClick={borrarDelCarrito}>X</button>
    </div>
    );
}

export default CarritoTarjeta;