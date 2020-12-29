
import Comentario from './Comentario'

const ComentariosList = (props) => (

    <ul  className="list-group list-group-flush comentariosBox">     

                {props.comentarios_data.map(
                    (comentario,i) => (
                        <Comentario
                        keyC = {i}
                        id = {comentario.id}
                        contenido = {comentario.contenido}
                        publicacion = {comentario.publicacion}
                        creador = {comentario.creador}
                        />
                    )
                )}
                     
    </ul>

)   
export default ComentariosList