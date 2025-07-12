import Swal from 'sweetalert2';

export function dispararSweetBasico(titulo, texto = "", icono = "info", boton = "OK") {
    Swal.fire({
        title: titulo,
        text: texto,
        icon: icono,
        confirmButtonText: boton,
    });
}