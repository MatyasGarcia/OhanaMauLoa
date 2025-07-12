export default function Cosultas(){

return(
    <div className="p-4 my-3 border rounded shadow">
        <h3 className="mb-3">Dejanos tu Consulta</h3>
        <form action="https://formspree.io/f/xnnqazkb" method="post">
        <div>
            <label for="Usuario"> Nombre </label>
            <input type="text" name="Usuario" className="form-control mb-3" placeholder="Nombre" />
        </div>
        <div>
            <label for="Correo"> Correo </label>
            <input type="email" name="Correo" className="form-control mb-3" placeholder="Correo Electrónico" />
        </div>
        <div>
            <label for="Mensaje"> Mensaje </label>
            <textarea name="Mensaje" id="" className="form-control mb-3" cols="30" rows="10" placeholder="Deje aqui su Mensaje (500 caracteres)"></textarea>
        </div>
        <input type="submit" value="Enviar Comentario" className="btn btn-primary btn-lg w-100"></input>
        </form>
    </div>
    )
}