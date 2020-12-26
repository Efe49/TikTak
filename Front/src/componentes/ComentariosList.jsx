
import Comentario from './Comentario'

const ComentariosList = (props) => (

    <ul key ={props.publicacionID+props.comentarios_data} class="list-group list-group-flush comentariosBox">     

                {props.comentarios_data.map(
                    comentario => (
                        <Comentario
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