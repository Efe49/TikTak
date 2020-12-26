import Publicacion from './Publicacion'

const PublicacionesList = (props) => (

    <ul class="nav container mx-auto">
        <div class="row mx-auto">
            <div class="post-box mx-auto border-dark">
                
                {props.publicaciones_data.map(
                    publicacion => (

                        <Publicacion
                            _id = {publicacion._id}
                            id = {publicacion.id}
                            contenido = {publicacion.contenido}
                            titulo = {publicacion.titulo}
                            descripcion = {publicacion.Descripcion}
                            meGusta = {publicacion.meGusta}
                            noMeGusta = {publicacion.noMeGusta}
                            creador = {publicacion.creador}
                            />
                    )
                )}
                    
                
            </div>
        </div>
    </ul>

)
   
    
export default PublicacionesList

